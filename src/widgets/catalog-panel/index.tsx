"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { PRODUCTS, ProductThumbnail, formatIdr, type Product } from "@/entities/product";
import { PRESETS, matchesPreset, useWorkspaceViewModel } from "@/features/configure-workspace";

type WorkspaceViewModel = ReturnType<typeof useWorkspaceViewModel>;
const TABS = ["Desks", "Chairs", "Accessories"] as const;
type Tab = typeof TABS[number];

function FurnitureCard({ product, model }: { product: Product; model: WorkspaceViewModel }) {
  const selected = model.config.deskId === product.id || model.config.chairId === product.id;
  return (
    <button
      type="button"
      className={"furniture-card relative grid grid-cols-1 cursor-pointer overflow-hidden rounded-[9px] border bg-[#fffefa] p-0 text-left transition-[border-color,box-shadow] duration-180 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-[.48] max-lg:grid-cols-[77px_minmax(0,1fr)] max-lg:items-center max-lg:gap-x-[9px] max-lg:p-3 max-phone:grid-cols-[68px_minmax(0,1fr)] max-phone:gap-x-[11px] max-phone:p-[11px] " + (selected ? "is-selected border-green shadow-[0_0_0_1px_var(--green)]" : "border-[#e2e4d9] not-disabled:hover:border-[#9ba98e]")}
      aria-label={"Select " + product.name} aria-pressed={selected} disabled={!model.hydrated} onClick={() => model.selectProduct(product.id)}
    >
      {/* On a phone the card lays out like an accessory card: art left, copy right, action row below. */}
      <span className="product-art relative flex min-h-[113px] items-center justify-center bg-[#f0f1e7] max-lg:h-[85px] max-lg:min-h-0 max-lg:w-[77px] max-lg:rounded-md max-phone:h-[81px] max-phone:w-[68px]">
        <ProductThumbnail product={product} className="h-[113px] w-[164px] max-lg:h-auto max-lg:w-[82px] max-phone:w-20" />
        <span className={"selection-indicator absolute top-2.5 right-2.5 grid size-[23px] place-items-center rounded-full border max-lg:hidden " + (selected ? "border-green bg-green text-[13px] leading-normal text-white" : "border-[#cdd5c2] bg-[#f8f9f0] text-sm leading-normal text-[#6a7c5f]")} aria-hidden="true">{selected ? "✓" : "+"}</span>
      </span>
      <span className="product-copy flex min-w-0 flex-col gap-[5px] px-[13px] pt-3 pb-[31px] max-lg:p-0">
        <span className="product-name text-sm leading-[1.35] font-semibold text-foreground max-lg:text-[13px]">{product.name}</span>
        <span className="product-description text-[12px] leading-[1.6] text-muted max-phone:leading-[1.65]">{product.description}</span>
        <span className="product-price mt-[3px] text-[13px] leading-[1.6] font-semibold text-foreground">
          {formatIdr(product.monthlyPriceIdr)}<span className="text-[12px] font-normal text-muted"> / month</span>
        </span>
      </span>
      <span className={"product-state absolute right-[13px] bottom-2.5 text-[12px] max-lg:hidden " + (selected ? "font-semibold text-green" : "text-muted")}>{selected ? "Selected" : "Select"}</span>
      <span className="product-action col-span-full mt-[11px] hidden items-center justify-between gap-[5px] border-t border-[#e6e7dc] pt-[9px] max-lg:flex" aria-hidden="true">
        <span className="text-[12px] text-muted">{selected ? "In your workspace" : "Pick one " + product.category}</span>
        <span className={"inline-flex min-h-9 min-w-[86px] items-center justify-center rounded-md border px-3 text-[13px] " + (selected ? "border-green bg-green text-white" : "border-[#dce2d3] bg-[#f8f9f2] text-green")}>{selected ? "✓ Selected" : "Select"}</span>
      </span>
    </button>
  );
}

function AccessoryCard({ product, model }: { product: Product; model: WorkspaceViewModel }) {
  const count = model.config.accessoryCounts[product.id] ?? 0;
  const disabled = !model.hydrated || !model.desk;
  return (
    <article className={"accessory-card rounded-[9px] border bg-[#fffefa] p-3 max-phone:p-[11px] " + (count ? "is-added border-[#b8c8a9]" : "border-[#e2e4d9]")} aria-labelledby={product.id + "-title"}>
      <div className="accessory-top flex items-center gap-[9px] max-phone:gap-[11px]">
        <span className="accessory-art flex h-[85px] w-[77px] shrink-0 items-center justify-center rounded-md bg-[#f0f1e7] max-phone:h-[81px] max-phone:w-[68px]">
          <ProductThumbnail product={product} className="h-auto w-[82px] max-phone:w-20" />
        </span>
        <div className="product-copy flex min-w-0 flex-col gap-[5px]">
          <h3 className="product-name text-[13px] leading-[1.35] font-semibold text-foreground max-phone:text-[13px]" id={product.id + "-title"}>{product.name}</h3>
          <p className="product-description text-[12px] leading-[1.6] text-muted max-phone:text-[12px] max-phone:leading-[1.65]">{product.description}</p>
          <p className="product-price mt-[3px] text-[13px] leading-[1.6] font-semibold text-foreground max-phone:text-[13px]">
            {formatIdr(product.monthlyPriceIdr)}<span className="text-[12px] font-normal text-muted max-phone:text-[12px]"> / month</span>
          </p>
        </div>
      </div>
      <div className="accessory-bottom mt-[11px] flex items-center justify-between gap-[5px] border-t border-[#e6e7dc] pt-[9px]">
        <span className="text-[12px] text-muted">{count ? count + " added" : "Optional extra"}</span>
        {product.category === "monitor" ? (
          <div className="quantity-control inline-flex items-center rounded-md border border-[#dce2d3] bg-[#f8f9f2]" role="group" aria-label="Monitor quantity">
            <button className="size-11 cursor-pointer border-0 bg-transparent text-[19px] text-green disabled:cursor-not-allowed disabled:opacity-[.48]" type="button" aria-label="Remove one monitor" disabled={disabled || count === 0} onClick={() => model.setAccessoryCount(product.id, count - 1)}>−</button>
            <output className="min-w-[23px] text-center text-[13px] leading-normal text-foreground" aria-label="Monitor count">{count}</output>
            <button className="size-11 cursor-pointer border-0 bg-transparent text-[19px] text-green disabled:cursor-not-allowed disabled:opacity-[.48]" type="button" aria-label="Add one monitor" disabled={disabled || count >= product.maxQuantity} onClick={() => model.setAccessoryCount(product.id, count + 1)}>+</button>
          </div>
        ) : (
          <button type="button" className="accessory-toggle min-h-11 min-w-[86px] cursor-pointer rounded-md border border-[#dce2d3] bg-[#f8f9f2] px-3 text-[13px] text-green aria-pressed:text-[#607054] disabled:cursor-not-allowed disabled:opacity-[.48]" aria-label={(count ? "Remove " : "Add ") + product.name} aria-pressed={Boolean(count)} disabled={disabled} onClick={() => model.setAccessoryCount(product.id, count ? 0 : 1)}>{count ? "Remove" : "+ Add"}</button>
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
      <div className="catalog-intro">
        <span className="eyebrow text-[12px] font-semibold tracking-[1.5px] text-green uppercase">The good pieces</span>
        <h2 className="mt-3 mb-[11px] font-display text-[31px] leading-[1.1] font-normal tracking-[-.8px] max-lg:text-[28px] max-phone:my-[11px]">Make yourself<br /><em className="text-green">at home.</em></h2>
        <p className="mb-[22px] text-[13px] leading-[1.8] text-muted max-lg:mb-4">Start with the essentials.<br />Add a little personality.</p>
      </div>
      <div className="catalog-presets mb-5 flex flex-col gap-2.5" role="group" aria-label="Quick start presets">
        <span className="text-[12px] text-muted">Quick start</span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button key={preset.id} type="button" title={preset.description} aria-pressed={matchesPreset(model.config, preset)} disabled={!model.hydrated} onClick={() => model.applyPreset(preset.id)}
              className="preset-chip min-h-9 cursor-pointer rounded-full border border-[#d2dac5] bg-[#f8f9f2] px-3.5 text-[13px] text-[#48613f] transition-[border-color,background-color] duration-150 not-disabled:hover:border-[#9ba98e] aria-pressed:border-green aria-pressed:bg-green aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-[.48] motion-reduce:transition-none">{preset.name}</button>
          ))}
        </div>
      </div>
      <div className="catalog-tabs mb-[17px] flex gap-[3px] border-b border-line" role="tablist" aria-label="Product categories">
        {TABS.map((item, index) => (
          <button
            className="min-h-11 flex-1 cursor-pointer border-0 border-b-2 border-transparent bg-transparent text-[13px] text-muted aria-selected:border-green aria-selected:font-[650] aria-selected:text-green"
            key={item} type="button" ref={(element) => { tabRefs.current[index] = element; }} role="tab"
            id={"tab-" + item.toLowerCase()} aria-controls={"panel-" + item.toLowerCase()} aria-selected={tab === item} tabIndex={tab === item ? 0 : -1}
            onClick={() => setTab(item)} onKeyDown={(event) => onTabKey(event, index)}
          >{item}</button>
        ))}
      </div>
      <div className={"catalog-products grid gap-[13px] max-lg:gap-[15px] max-phone:gap-[11px]"} role="tabpanel" id={"panel-" + tab.toLowerCase()} aria-labelledby={"tab-" + tab.toLowerCase()} tabIndex={0}>
        {tab === "Accessories" && !model.desk && <p className="accessory-guidance rounded-[7px] bg-[#edf0e2] px-3 py-[11px] text-[13px] leading-[1.7] text-[#526149]">Pick a desk first to make room for your extras.</p>}
        {products.map((product) => tab === "Accessories" ? <AccessoryCard key={product.id} product={product} model={model} /> : <FurnitureCard key={product.id} product={product} model={model} />)}
      </div>
      <p className="catalog-footnote mt-[18px] text-center text-[12px] text-muted max-phone:text-[12px]">One workspace. Endless possibilities.</p>
    </section>
  );
}
