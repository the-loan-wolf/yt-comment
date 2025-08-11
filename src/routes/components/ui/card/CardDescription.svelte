<script>
	let { class: className = '', children, ...restProps } = $props();
</script>

<p class="text-muted-foreground text-sm {className}" {...restProps}>
	{@render children()}
</p>
