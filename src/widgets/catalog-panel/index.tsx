"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { PRODUCTS, ProductThumbnail, formatIdr, type Product } from "@/entities/product";
import { useWorkspaceViewModel } from "@/features/configure-workspace";

type WorkspaceViewModel = ReturnType<typeof useWorkspaceViewModel>;
const TABS = ["Desks", "Chairs", "Accessories"] as const;
type Tab = typeof TABS[number];

function FurnitureCard({ product, model }: { product: Product; model: WorkspaceViewModel }) {
  const selected = model.config.deskId === product.id || model.config.chairId === product.id;
  return (
    <button
      type="button"
      className={"furniture-card relative grid grid-cols-1 cursor-pointer overflow-hidden rounded-[9px] border bg-[#fffefa] p-0 text-left transition-[border-color,box-shadow] duration-180 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-[.48] " + (selected ? "is-selected border-green shadow-[0_0_0_1px_var(--green)]" : "border-[#e2e4d9] not-disabled:hover:border-[#9ba98e]")}
      aria-label={"Select " + product.name} aria-pressed={selected} disabled={!model.hydrated} onClick={() => model.selectProduct(product.id)}
    >
      <span className="product-art relative flex min-h-[113px] items-center justify-center bg-[#f0f1e7] max-phone:min-h-24">
        <ProductThumbnail product={product} className="h-[113px] w-[164px] max-phone:h-24 max-phone:w-32 max-phone:max-w-full" />
        <span className={"selection-indicator absolute top-2.5 right-2.5 grid size-[23px] place-items-center rounded-full border max-phone:top-[7px] max-phone:right-[7px] max-phone:size-5 " + (selected ? "border-green bg-green text-xs leading-normal text-white" : "border-[#cdd5c2] bg-[#f8f9f0] text-sm leading-normal text-[#6a7c5f]")} aria-hidden="true">{selected ? "✓" : "+"}</span>
      </span>
      <span className="product-copy flex min-w-0 flex-col gap-[5px] px-[13px] pt-3 pb-[31px] max-phone:px-2.5 max-phone:pt-[11px] max-phone:pb-8">
        <span className="product-name text-[13px] leading-[1.35] font-semibold text-foreground max-phone:text-xs">{product.name}</span>
        <span className="product-description text-[10px] leading-[1.6] text-muted max-phone:min-h-[33px] max-phone:leading-[1.65]">{product.description}</span>
        <span className="product-price mt-[3px] text-xs leading-[1.6] font-semibold text-foreground max-phone:text-[11px]">
          {formatIdr(product.monthlyPriceIdr)}<span className="text-[10px] font-normal text-muted max-phone:block max-phone:text-[9px]"> / month</span>
        </span>
      </span>
      <span className={"product-state absolute right-[13px] bottom-2.5 text-[9px] max-phone:right-2.5 " + (selected ? "font-semibold text-green" : "text-muted")}>{selected ? "Selected" : "Select"}</span>
    </button>
  );
}

function AccessoryCard({ product, model }: { product: Product; model: WorkspaceViewModel }) {
  const count = model.config.accessoryCounts[product.id] ?? 0;
  const disabled = !model.hydrated || !model.desk;
  return (
    <article className={"accessory-card rounded-[9px] border bg-[#fffefa] p-3 max-phone:p-[11px] " + (count ? "is-added border-[#b8c8a9]" : "border-[#e2e4d9]")} aria-labelledby={product.id + "-title"}>
      <div className="accessory-top flex items-center gap-[9px] max-lg:gap-[17px] max-phone:gap-[11px]">
        <span className="accessory-art flex h-[85px] w-[77px] shrink-0 items-center justify-center rounded-md bg-[#f0f1e7] max-lg:h-[90px] max-lg:w-[100px] max-phone:h-[81px] max-phone:w-[68px]">
          <ProductThumbnail product={product} className="h-auto w-[82px] max-lg:w-[103px] max-phone:w-20" />
        </span>
        <div className="product-copy flex min-w-0 flex-col gap-[5px]">
          <h3 className="product-name text-xs leading-[1.35] font-semibold text-foreground max-lg:text-sm max-phone:text-xs" id={product.id + "-title"}>{product.name}</h3>
          <p className="product-description text-[10px] leading-[1.6] text-muted max-lg:text-xs max-phone:text-[10px] max-phone:leading-[1.65]">{product.description}</p>
          <p className="product-price mt-[3px] text-[11px] leading-[1.6] font-semibold text-foreground max-lg:text-[13px] max-phone:text-[11px]">
            {formatIdr(product.monthlyPriceIdr)}<span className="text-[10px] font-normal text-muted max-phone:text-[9px]"> / month</span>
          </p>
        </div>
      </div>
      <div className="accessory-bottom mt-[11px] flex items-center justify-between gap-[5px] border-t border-[#e6e7dc] pt-[9px]">
        <span className="text-[10px] text-muted max-lg:text-[11px]">{count ? count + " added" : "Optional extra"}</span>
        {product.category === "monitor" ? (
          <div className="quantity-control inline-flex items-center rounded-md border border-[#dce2d3] bg-[#f8f9f2]" role="group" aria-label="Monitor quantity">
            <button className="size-11 cursor-pointer border-0 bg-transparent text-[19px] text-green disabled:cursor-not-allowed disabled:opacity-[.48]" type="button" aria-label="Remove one monitor" disabled={disabled || count === 0} onClick={() => model.setAccessoryCount(product.id, count - 1)}>−</button>
            <output className="min-w-[23px] text-center text-xs leading-normal text-foreground" aria-label="Monitor count">{count}</output>
            <button className="size-11 cursor-pointer border-0 bg-transparent text-[19px] text-green disabled:cursor-not-allowed disabled:opacity-[.48]" type="button" aria-label="Add one monitor" disabled={disabled || count >= product.maxQuantity} onClick={() => model.setAccessoryCount(product.id, count + 1)}>+</button>
          </div>
        ) : (
          <button type="button" className="accessory-toggle min-h-11 min-w-[86px] cursor-pointer rounded-md border border-[#dce2d3] bg-[#f8f9f2] px-3 text-[11px] text-green aria-pressed:text-[#607054] disabled:cursor-not-allowed disabled:opacity-[.48]" aria-label={(count ? "Remove " : "Add ") + product.name} aria-pressed={Boolean(count)} disabled={disabled} onClick={() => model.setAccessoryCount(product.id, count ? 0 : 1)}>{count ? "Remove" : "+ Add"}</button>
        )}
      </div>
    </article>
  );
}

export function CatalogPanel({ model }: { model: WorkspaceViewModel }) {
  const [tab, setTab] = useState<Tab>("Desks");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index + TABS.length - 1) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    else return;
    event.preventDefault();
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  }
  const products = PRODUCTS.filter((product) => tab === "Desks" ? product.category === "desk" : tab === "Chairs" ? product.category === "chair" : !["desk", "chair"].includes(product.category));

  return (
    <section className="catalog-panel rounded-[13px] border border-[#e2e3d9] bg-[#fcfbf7] px-[21px] pt-[25px] pb-[17px] max-lg:w-full max-lg:p-[22px] max-phone:px-[15px] max-phone:pt-[19px] max-phone:pb-4" aria-label="Choose workspace furniture">
      <div className="catalog-intro max-lg:grid max-lg:grid-cols-2 max-lg:items-center max-phone:grid-cols-1">
        <span className="eyebrow text-[9px] font-semibold tracking-[1.5px] text-green uppercase max-lg:col-span-full">The good pieces</span>
        <h2 className="mt-3 mb-[11px] font-display text-[31px] leading-[1.1] font-normal tracking-[-.8px] max-lg:mb-[19px] max-lg:text-[28px] max-phone:my-[11px]">Make yourself<br /><em className="text-green">at home.</em></h2>
        <p className="mb-[22px] text-[11px] leading-[1.8] text-muted max-lg:mb-0 max-lg:justify-self-end max-phone:mb-4 max-phone:justify-self-start">Start with the essentials.<br />Add a little personality.</p>
      </div>
      <div className="catalog-tabs mb-[17px] flex gap-[3px] border-b border-line max-lg:max-w-[340px]" role="tablist" aria-label="Product categories">
        {TABS.map((item, index) => (
          <button
            className="min-h-11 flex-1 cursor-pointer border-0 border-b-2 border-transparent bg-transparent text-[11px] text-muted aria-selected:border-green aria-selected:font-[650] aria-selected:text-green"
            key={item} type="button" ref={(element) => { tabRefs.current[index] = element; }} role="tab"
            id={"tab-" + item.toLowerCase()} aria-controls={"panel-" + item.toLowerCase()} aria-selected={tab === item} tabIndex={tab === item ? 0 : -1}
            onClick={() => setTab(item)} onKeyDown={(event) => onTabKey(event, index)}
          >{item}</button>
        ))}
      </div>
      <div className={"catalog-products grid gap-[13px] max-lg:gap-[15px] max-phone:gap-[11px] " + (tab === "Accessories" ? "grid-cols-1" : "max-lg:grid-cols-2")} role="tabpanel" id={"panel-" + tab.toLowerCase()} aria-labelledby={"tab-" + tab.toLowerCase()} tabIndex={0}>
        {tab === "Accessories" && !model.desk && <p className="accessory-guidance rounded-[7px] bg-[#edf0e2] px-3 py-[11px] text-[11px] leading-[1.7] text-[#526149]">Pick a desk first to make room for your extras.</p>}
        {products.map((product) => tab === "Accessories" ? <AccessoryCard key={product.id} product={product} model={model} /> : <FurnitureCard key={product.id} product={product} model={model} />)}
      </div>
      <p className="catalog-footnote mt-[18px] text-center text-[10px] text-muted max-phone:text-[9px]">One workspace. Endless possibilities.</p>
    </section>
  );
}
