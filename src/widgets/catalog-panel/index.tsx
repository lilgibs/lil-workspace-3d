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
    <button type="button" className={`furniture-card${selected ? " is-selected" : ""}`} aria-label={`Select ${product.name}`} aria-pressed={selected} disabled={!model.hydrated} onClick={() => model.selectProduct(product.id)}>
      <span className="product-art"><ProductThumbnail product={product} /><span className="selection-indicator" aria-hidden="true">{selected ? "✓" : "+"}</span></span>
      <span className="product-copy"><span className="product-name">{product.name}</span><span className="product-description">{product.description}</span><span className="product-price">{formatIdr(product.monthlyPriceIdr)}<span> / month</span></span></span>
      <span className="product-state">{selected ? "Selected" : "Select"}</span>
    </button>
  );
}

function AccessoryCard({ product, model }: { product: Product; model: WorkspaceViewModel }) {
  const count = model.config.accessoryCounts[product.id] ?? 0;
  const disabled = !model.hydrated || !model.desk;
  return (
    <article className={`accessory-card${count ? " is-added" : ""}`} aria-labelledby={`${product.id}-title`}>
      <div className="accessory-top"><span className="accessory-art"><ProductThumbnail product={product} /></span><div className="product-copy"><h3 className="product-name" id={`${product.id}-title`}>{product.name}</h3><p className="product-description">{product.description}</p><p className="product-price">{formatIdr(product.monthlyPriceIdr)}<span> / month</span></p></div></div>
      <div className="accessory-bottom">
        <span>{count ? `${count} added` : "Optional extra"}</span>
        {product.category === "monitor" ? <div className="quantity-control" role="group" aria-label="Monitor quantity">
          <button type="button" aria-label="Remove one monitor" disabled={disabled || count === 0} onClick={() => model.setAccessoryCount(product.id, count - 1)}>−</button>
          <output aria-label="Monitor count">{count}</output>
          <button type="button" aria-label="Add one monitor" disabled={disabled || count >= product.maxQuantity} onClick={() => model.setAccessoryCount(product.id, count + 1)}>+</button>
        </div> : <button type="button" className="accessory-toggle" aria-label={`${count ? "Remove" : "Add"} ${product.name}`} aria-pressed={Boolean(count)} disabled={disabled} onClick={() => model.setAccessoryCount(product.id, count ? 0 : 1)}>{count ? "Remove" : "+ Add"}</button>}
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
    <section className="catalog-panel" aria-label="Choose workspace furniture">
      <div className="catalog-intro"><span className="eyebrow">The good pieces</span><h2>Make yourself<br /><em>at home.</em></h2><p>Start with the essentials.<br />Add a little personality.</p></div>
      <div className="catalog-tabs" role="tablist" aria-label="Product categories">{TABS.map((item, index) => <button key={item} type="button" ref={(element) => { tabRefs.current[index] = element; }} role="tab" id={`tab-${item.toLowerCase()}`} aria-controls={`panel-${item.toLowerCase()}`} aria-selected={tab === item} tabIndex={tab === item ? 0 : -1} onClick={() => setTab(item)} onKeyDown={(event) => onTabKey(event, index)}>{item}</button>)}</div>
      <div className="catalog-products" role="tabpanel" id={`panel-${tab.toLowerCase()}`} aria-labelledby={`tab-${tab.toLowerCase()}`} tabIndex={0}>
        {tab === "Accessories" && !model.desk && <p className="accessory-guidance">Pick a desk first to make room for your extras.</p>}
        {products.map((product) => tab === "Accessories" ? <AccessoryCard key={product.id} product={product} model={model} /> : <FurnitureCard key={product.id} product={product} model={model} />)}
      </div>
      <p className="catalog-footnote">One workspace. Endless possibilities.</p>
    </section>
  );
}
