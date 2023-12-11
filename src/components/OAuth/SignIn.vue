<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const signInBtn = ref<HTMLButtonElement | undefined>(undefined);

    onMounted(() => {
        if (signInBtn.value !== undefined){
        signInBtn.value.onclick = async (ev: MouseEvent) => {
                await signInWithPopup(auth, provider).then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    if(!credential){
                        throw new Error();
                    }
                    const token = credential.accessToken;
                    const user = result.user;

                    
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                });
            }
        }
    })
</script>

<template>
    <button ref="signInBtn">SIGN IN</button>
</template>

<style scoped>
</style>