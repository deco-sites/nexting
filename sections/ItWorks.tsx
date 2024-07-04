import { useSection } from "deco/hooks/useSection.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

interface TabItem {
  title: string;
  content: string;
  image?: ImageWidget;
}

interface TabSectionProps {
  /**
   * @format rich-text
   * @description The title of the tab section
   * @default Tab Section
   */
  title?: string;
  
  /**
   * @format textarea
   * @description The description of the tab section
   * @default This is a tab section component
   */
  description?: string;

  /**
   * @description The items to display in the tabs
   */
  items: TabItem[];
}

export default function TabSection({
  title = "Tab Section",
  description = "This is a tab section component",
  items = [],
}: TabSectionProps) {
  return (
    <div class="container mx-auto py-8">
      <h2 class="text-3xl font-bold mb-4">{title}</h2>
      <p class="text-gray-500 mb-8">{description}</p>
      <div class="tabs">
        {items.map((item, index) => (
          <a 
            key={index}
            class={`tab tab-bordered ${index === 0 ? 'tab-active' : ''}`}
            hx-get={useSection({ props: { items: items.map((_, i) => i === index) } })}
            hx-target="closest .container"
            hx-swap="outerHTML"
          >
            {item.title}
          </a>
        ))}
      </div>
      <div class="mt-8">
        {items.map((item, index) => (
          <div class={`tab-content ${index === 0 ? 'block' : 'hidden'}`}>
            {item.image && (
              <img 
                src={item.image.url} 
                alt={item.title} 
                class="w-full h-64 object-cover mb-4"
              />
            )}
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}