<script>
	let { class: className = '', children, ...restProps } = $props();
</script>

<div class="bg-card text-card-foreground rounded-lg border shadow-sm {className}" {...restProps}>
	{@render children()}
</div>
