<script>
	let { class: className = '', children, ...restProps } = $props();
</script>

<h3 class="text-2xl leading-none font-semibold tracking-tight {className}" {...restProps}>
	{@render children()}
</h3>
