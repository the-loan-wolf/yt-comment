<script>
	let {
		type = 'button',
		disabled = false,
		class: className = '',
		children,
		onclick,
		...restProps
	} = $props();
</script>

<button
	{type}
	{disabled}
	class="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 {className}"
	{onclick}
	{...restProps}
>
	{@render children()}
</button>
