<script>
	let { class: className = '', children, ...restProps } = $props();
</script>

<div class="flex flex-col space-y-1.5 p-6 {className}" {...restProps}>
	{@render children()}
</div>
