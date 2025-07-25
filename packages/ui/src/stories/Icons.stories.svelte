<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import {
    AddIcon,
    AppleIcon,
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CameraIcon,
    CategoriesIcon,
    ChatIcon,
    CheckIcon,
    CloseIcon,
    CreateIcon,
    DeleteIcon,
    EditIcon,
    EnergyIcon,
    ExploreIcon,
    EyeInvisibleIcon,
    EyeVisibleIcon,
    FacebookIcon,
    FilterIcon,
    GoogleIcon,
    HamburgerMenuIcon,
    HeartFilledIcon,
    HeartOutlinedIcon,
    ImageIcon,
    InboxIcon,
    InfoIcon,
    LinkedInIcon,
    MinusIcon,
    PlaceholderIcon,
    PlayIcon,
    ProfileIcon,
    SearchIcon,
    SendIcon,
    SettingsIcon,
    ShoppingBagFilledIcon,
    ShoppingBagOutlinedIcon,
    SortIcon,
    SpinnerIcon,
    StarFilledIcon,
    StarOutlinedIcon,
    StoreIcon,
    SuccessIcon,
    VideoIcon,
    WarningIcon,
  } from '../lib/icons'

  const { Story } = defineMeta({
    title: 'Icons/All Icons',
    component: AddIcon,
    args: {
      size: 24,
    },
    argTypes: {
      size: {
        control: { type: 'number' },
        description: 'Icon size in pixels',
      },
      class: {
        control: { type: 'text' },
        description: 'CSS classes for styling',
      },
    },
  })
</script>

<Story name="Overview" args={{}} parameters={{ layout: 'wide' }}>
  {#snippet template(args)}
    <div class="grid grid-cols-4 gap-4 md:grid-cols-6">
      <div class="flex flex-col items-center gap-2">
        <AddIcon {...args} />
        <span class="text-xs text-neutral-600">AddIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <AppleIcon {...args} />
        <span class="text-xs text-neutral-600">AppleIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ArrowDownIcon {...args} />
        <span class="text-xs text-neutral-600">ArrowDownIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ArrowLeftIcon {...args} />
        <span class="text-xs text-neutral-600">ArrowLeftIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ArrowRightIcon {...args} />
        <span class="text-xs text-neutral-600">ArrowRightIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ArrowUpIcon {...args} />
        <span class="text-xs text-neutral-600">ArrowUpIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <CameraIcon {...args} />
        <span class="text-xs text-neutral-600">CameraIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <CategoriesIcon {...args} />
        <span class="text-xs text-neutral-600">CategoriesIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ChatIcon {...args} />
        <span class="text-xs text-neutral-600">ChatIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <CheckIcon {...args} />
        <span class="text-xs text-neutral-600">CheckIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <CloseIcon {...args} />
        <span class="text-xs text-neutral-600">CloseIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <CreateIcon {...args} />
        <span class="text-xs text-neutral-600">CreateIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <DeleteIcon {...args} />
        <span class="text-xs text-neutral-600">DeleteIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <EditIcon {...args} />
        <span class="text-xs text-neutral-600">EditIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <EnergyIcon {...args} />
        <span class="text-xs text-neutral-600">EnergyIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ExploreIcon {...args} />
        <span class="text-xs text-neutral-600">ExploreIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <EyeInvisibleIcon {...args} />
        <span class="text-xs text-neutral-600">EyeInvisibleIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <EyeVisibleIcon {...args} />
        <span class="text-xs text-neutral-600">EyeVisibleIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <FacebookIcon {...args} />
        <span class="text-xs text-neutral-600">FacebookIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <FilterIcon {...args} />
        <span class="text-xs text-neutral-600">FilterIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <GoogleIcon {...args} />
        <span class="text-xs text-neutral-600">GoogleIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <HamburgerMenuIcon {...args} />
        <span class="text-xs text-neutral-600">HamburgerMenuIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <HeartFilledIcon {...args} />
        <span class="text-xs text-neutral-600">HeartFilledIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <HeartOutlinedIcon {...args} />
        <span class="text-xs text-neutral-600">HeartOutlinedIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ImageIcon {...args} />
        <span class="text-xs text-neutral-600">ImageIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <InboxIcon {...args} />
        <span class="text-xs text-neutral-600">InboxIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <InfoIcon {...args} />
        <span class="text-xs text-neutral-600">InfoIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <LinkedInIcon {...args} />
        <span class="text-xs text-neutral-600">LinkedInIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <MinusIcon {...args} />
        <span class="text-xs text-neutral-600">MinusIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <PlaceholderIcon {...args} />
        <span class="text-xs text-neutral-600">PlaceholderIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <PlayIcon {...args} />
        <span class="text-xs text-neutral-600">PlayIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ProfileIcon {...args} />
        <span class="text-xs text-neutral-600">ProfileIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <SearchIcon {...args} />
        <span class="text-xs text-neutral-600">SearchIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <SendIcon {...args} />
        <span class="text-xs text-neutral-600">SendIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <SettingsIcon {...args} />
        <span class="text-xs text-neutral-600">SettingsIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ShoppingBagFilledIcon {...args} />
        <span class="text-xs text-neutral-600">ShoppingBagFilledIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ShoppingBagOutlinedIcon {...args} />
        <span class="text-xs text-neutral-600">ShoppingBagOutlinedIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <SortIcon {...args} />
        <span class="text-xs text-neutral-600">SortIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <SpinnerIcon {...args} />
        <span class="text-xs text-neutral-600">SpinnerIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <StarFilledIcon {...args} />
        <span class="text-xs text-neutral-600">StarFilledIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <StarOutlinedIcon {...args} />
        <span class="text-xs text-neutral-600">StarOutlinedIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <StoreIcon {...args} />
        <span class="text-xs text-neutral-600">StoreIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <SuccessIcon {...args} />
        <span class="text-xs text-neutral-600">SuccessIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <VideoIcon {...args} />
        <span class="text-xs text-neutral-600">VideoIcon</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <WarningIcon {...args} />
        <span class="text-xs text-neutral-600">WarningIcon</span>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Icon Sizes" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="space-y-2">
      <div class="flex items-center gap-4">
        <span class="w-16 text-sm font-medium">16px:</span>
        <AddIcon size={16} />
        <SearchIcon size={16} />
        <SettingsIcon size={16} />
        <ProfileIcon size={16} />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-16 text-sm font-medium">24px:</span>
        <AddIcon size={24} />
        <SearchIcon size={24} />
        <SettingsIcon size={24} />
        <ProfileIcon size={24} />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-16 text-sm font-medium">32px:</span>
        <AddIcon size={32} />
        <SearchIcon size={32} />
        <SettingsIcon size={32} />
        <ProfileIcon size={32} />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-16 text-sm font-medium">48px:</span>
        <AddIcon size={48} />
        <SearchIcon size={48} />
        <SettingsIcon size={48} />
        <ProfileIcon size={48} />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Icon Colors" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="space-y-2">
      <div class="flex items-center gap-4">
        <span class="w-20 text-sm font-medium">Neutral:</span>
        <AddIcon size={24} class="text-neutral" />
        <SearchIcon size={24} class="text-neutral" />
        <SettingsIcon size={24} class="text-neutral" />
        <ProfileIcon size={24} class="text-neutral" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-20 text-sm font-medium">Highlight:</span>
        <AddIcon size={24} class="text-highlight" />
        <SearchIcon size={24} class="text-highlight" />
        <SettingsIcon size={24} class="text-highlight" />
        <ProfileIcon size={24} class="text-highlight" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-20 text-sm font-medium">Success:</span>
        <AddIcon size={24} class="text-success" />
        <SearchIcon size={24} class="text-success" />
        <SettingsIcon size={24} class="text-success" />
        <ProfileIcon size={24} class="text-success" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-20 text-sm font-medium">Warning:</span>
        <AddIcon size={24} class="text-warning" />
        <SearchIcon size={24} class="text-warning" />
        <SettingsIcon size={24} class="text-warning" />
        <ProfileIcon size={24} class="text-warning" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-20 text-sm font-medium">Error:</span>
        <AddIcon size={24} class="text-error" />
        <SearchIcon size={24} class="text-error" />
        <SettingsIcon size={24} class="text-error" />
        <ProfileIcon size={24} class="text-error" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Arrow Icons" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="flex justify-start">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <ArrowUpIcon size={32} />
          <span class="text-xs text-neutral-600">Up</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ArrowDownIcon size={32} />
          <span class="text-xs text-neutral-600">Down</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ArrowLeftIcon size={32} />
          <span class="text-xs text-neutral-600">Left</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ArrowRightIcon size={32} />
          <span class="text-xs text-neutral-600">Right</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Status Icons" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="flex justify-start">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <CheckIcon size={32} class="text-success" />
          <span class="text-xs text-neutral-600">Success</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SuccessIcon size={32} class="text-success" />
          <span class="text-xs text-neutral-600">Success Circle</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <WarningIcon size={32} class="text-warning" />
          <span class="text-xs text-neutral-600">Warning</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <InfoIcon size={32} class="text-highlight" />
          <span class="text-xs text-neutral-600">Info</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <DeleteIcon size={32} class="text-error" />
          <span class="text-xs text-neutral-600">Delete</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <CloseIcon size={32} class="text-error" />
          <span class="text-xs text-neutral-600">Close</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Social Icons" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="flex justify-start">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <FacebookIcon size={32} class="text-highlight" />
          <span class="text-xs text-neutral-600">Facebook</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <GoogleIcon size={32} class="text-error" />
          <span class="text-xs text-neutral-600">Google</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <LinkedInIcon size={32} class="text-highlight" />
          <span class="text-xs text-neutral-600">LinkedIn</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <AppleIcon size={32} />
          <span class="text-xs text-neutral-600">Apple</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
