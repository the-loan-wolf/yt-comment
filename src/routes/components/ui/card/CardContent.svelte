<script>
	let { class: className = '', children, ...restProps } = $props();
</script>

<div class="p-6 pt-0 {className}" {...restProps}>
	{@render children()}
</div>
