<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Accordion from '../lib/components/layout/Accordion.svelte'

  const { Story } = defineMeta({
    title: 'Components/Accordion',
    component: Accordion,
    args: {
      title: 'Accordion Title',
      open: false,
    },
    argTypes: {
      title: {
        control: { type: 'text' },
        description: 'The title shown in the accordion header',
      },
      open: {
        control: { type: 'boolean' },
        description: 'Whether the accordion is initially open',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the accordion is disabled',
      },
    },
  })
</script>

<Story name="Basic Closed" args={{ title: 'Basic Accordion', open: false }}>
  {#snippet template(args)}
    <Accordion {...args}>
      {#snippet children()}
        <p class="text-body-m text-secondary">
          This is the content inside the accordion. It can contain any HTML elements like text, images, or other
          components.
        </p>
      {/snippet}
    </Accordion>
  {/snippet}
</Story>

<Story name="Basic Open" args={{ title: 'Open Accordion', open: true }}>
  {#snippet template(args)}
    <Accordion {...args}>
      {#snippet children()}
        <p class="text-body-m text-secondary">
          This accordion starts in an open state. The chevron icon points up and the content is visible.
        </p>
      {/snippet}
    </Accordion>
  {/snippet}
</Story>

<Story name="With Rich Content" args={{ title: 'Accordion with Rich Content', open: false }}>
  {#snippet template(args)}
    <Accordion {...args}>
      {#snippet children()}
        <div class="space-y-3">
          <h4 class="text-h4 text-primary">Rich Content Example</h4>
          <p class="text-body-m text-secondary">
            This accordion contains multiple elements including headings, paragraphs, and lists.
          </p>
          <ul class="list-disc space-y-1 pl-6">
            <li class="text-body-s text-secondary">First item in the list</li>
            <li class="text-body-s text-secondary">Second item in the list</li>
            <li class="text-body-s text-secondary">Third item in the list</li>
          </ul>
          <div class="mt-3 rounded-lg bg-neutral-100 p-3">
            <p class="text-body-s text-secondary">This is a highlighted section within the accordion content.</p>
          </div>
        </div>
      {/snippet}
    </Accordion>
  {/snippet}
</Story>

<Story name="Disabled" args={{ title: 'Disabled Accordion', disabled: true }}>
  {#snippet template(args)}
    <Accordion {...args}>
      {#snippet children()}
        <p class="text-body-m text-secondary">This accordion is disabled and cannot be toggled.</p>
      {/snippet}
    </Accordion>
  {/snippet}
</Story>

<Story name="With Toggle Callback" args={{ title: 'Interactive Accordion', open: false }}>
  {#snippet template(args)}
    <Accordion {...args} onToggle={(open) => console.log('Accordion toggled:', open)}>
      {#snippet children()}
        <p class="text-body-m text-secondary">
          This accordion logs to the console when toggled. Check the browser console to see the output.
        </p>
      {/snippet}
    </Accordion>
  {/snippet}
</Story>

<Story name="Multiple Accordions">
  {#snippet template()}
    <div class="space-y-4">
      <Accordion title="First Section" open={true}>
        {#snippet children()}
          <p class="text-body-m text-secondary">This is the content of the first accordion section. It starts open.</p>
        {/snippet}
      </Accordion>

      <Accordion title="Second Section" open={false}>
        {#snippet children()}
          <p class="text-body-m text-secondary">
            This is the content of the second accordion section. It starts closed.
          </p>
        {/snippet}
      </Accordion>

      <Accordion title="Third Section" open={false}>
        {#snippet children()}
          <p class="text-body-m text-secondary">
            This is the content of the third accordion section. It also starts closed.
          </p>
        {/snippet}
      </Accordion>
    </div>
  {/snippet}
</Story>

<Story name="FAQ Example">
  {#snippet template()}
    <div class="space-y-4">
      <h2 class="text-h3 text-primary mb-4">Frequently Asked Questions</h2>

      <Accordion title="What is your return policy?" open={false}>
        {#snippet children()}
          <p class="text-body-m text-secondary">
            We offer a 30-day return policy for all items. Products must be in original condition with tags attached.
          </p>
        {/snippet}
      </Accordion>

      <Accordion title="How long does shipping take?" open={false}>
        {#snippet children()}
          <div class="space-y-2">
            <p class="text-body-m text-secondary">Shipping times depend on your location:</p>
            <ul class="list-disc space-y-1 pl-6">
              <li class="text-body-s text-secondary">Domestic: 3-5 business days</li>
              <li class="text-body-s text-secondary">International: 7-14 business days</li>
            </ul>
          </div>
        {/snippet}
      </Accordion>

      <Accordion title="Do you offer customer support?" open={false}>
        {#snippet children()}
          <p class="text-body-m text-secondary">
            Yes! Our customer support team is available 24/7 via email at support@example.com or through our live chat
            system.
          </p>
        {/snippet}
      </Accordion>

      <Accordion title="Can I track my order?" open={false}>
        {#snippet children()}
          <p class="text-body-m text-secondary">
            Absolutely! Once your order ships, you'll receive a tracking number via email. You can also track your order
            in the "My Orders" section of your account.
          </p>
        {/snippet}
      </Accordion>
    </div>
  {/snippet}
</Story>
