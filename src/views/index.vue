<!--从个人中心条跳转过来的中转页-->
<template>
	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		// beforeRouteEnter(to, from, next) {		
		// 	let login_token = to.query.token ? to.query.token : "";
		// 	if(login_token){			//证明是从个人中心携带token登录
		// 		localStorage.setItem("accessToken",login_token);
		// 		next(vm => {
		// 			let _that = vm;
		// 			_that.$store.dispatch('store/verification',{platformType:1}).then(res => {
		// 				//_that.$router.push("/regulation");
		// 			})
		// 		})
				
		// 	}
		// }
	}
</script>

<style>
</style>