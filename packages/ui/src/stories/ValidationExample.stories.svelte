<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import TextField from '../lib/components/forms/TextField.svelte'
  import TextArea from '../lib/components/forms/TextArea.svelte'
  import { validationRules } from '../lib/utils/validation.svelte'

  const { Story } = defineMeta({
    title: 'Forms/Validation Example',
    component: TextField,
    parameters: {
      docs: {
        description: {
          component: 'Demonstrates the unified validation system in action with various validation rules.',
        },
      },
    },
  })
</script>

<Story name="Email Validation" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Email Validation</h3>
      <TextField
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        validationRules={[
          validationRules.required('Email is required'),
          validationRules.email('Please enter a valid email address'),
        ]}
      />
    </div>
  {/snippet}
</Story>

<Story name="Password Requirements" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Password with Multiple Rules</h3>
      <TextField
        label="Password"
        type="password"
        placeholder="Create a secure password"
        helperText="Must be at least 8 characters with uppercase, lowercase, and number"
        validationRules={[
          validationRules.required('Password is required'),
          validationRules.minLength(8, 'Password must be at least 8 characters'),
          validationRules.pattern(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain uppercase, lowercase, and number'
          ),
        ]}
        validateOnChange={true}
      />
    </div>
  {/snippet}
</Story>

<Story name="Text Length Validation" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Text Area with Length Validation</h3>
      <TextArea
        label="Bio"
        placeholder="Tell us about yourself..."
        helperText="Share a brief bio (10-200 characters)"
        rows={4}
        maxlength={200}
        validationRules={[
          validationRules.required('Bio is required'),
          validationRules.minLength(10, 'Bio must be at least 10 characters'),
          validationRules.maxLength(200, 'Bio cannot exceed 200 characters'),
        ]}
      />
    </div>
  {/snippet}
</Story>

<Story name="Custom Validation" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Custom Username Validation</h3>
      <TextField
        label="Username"
        placeholder="Choose a username"
        helperText="Only letters, numbers, and underscores allowed"
        validationRules={[
          validationRules.required('Username is required'),
          validationRules.minLength(3, 'Username must be at least 3 characters'),
          validationRules.maxLength(20, 'Username cannot exceed 20 characters'),
          {
            validator: (value) => /^[a-zA-Z0-9_]+$/.test(value),
            message: 'Username can only contain letters, numbers, and underscores',
          },
        ]}
        validateOnChange={true}
      />
    </div>
  {/snippet}
</Story>

<Story name="Form with Multiple Fields" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Registration Form</h3>

      <TextField
        label="Full Name"
        placeholder="Enter your full name"
        validationRules={[
          validationRules.required('Name is required'),
          validationRules.minLength(2, 'Name must be at least 2 characters'),
        ]}
      />

      <TextField
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        validationRules={[
          validationRules.required('Email is required'),
          validationRules.email('Please enter a valid email address'),
        ]}
      />

      <TextField
        label="Phone Number"
        type="tel"
        placeholder="(555) 123-4567"
        validationRules={[
          validationRules.required('Phone number is required'),
          validationRules.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone must be in format (555) 123-4567'),
        ]}
      />

      <TextArea
        label="Comments"
        placeholder="Any additional comments..."
        rows={3}
        validationRules={[validationRules.maxLength(500, 'Comments cannot exceed 500 characters')]}
      />
    </div>
  {/snippet}
</Story>
