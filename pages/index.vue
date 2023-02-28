<template>
    <form>
        <label>Enter text below:</label>
        <textarea placeholder='Type something...' v-model="form.text" spellcheck="false"></textarea>
        <button type="button" @click="handleSubmit">Download PDF</button>
    </form>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            form: {
                text: ''
            }
        }
    },
    methods: {
        async handleSubmit() {
            const { data } = await useFetch('/api/text', {
                method: 'post',
                body: {
                    originalText: this.form.text
                }
            })

            if (data) {
                console.log(data.value);
                const url = URL.createObjectURL(data.value);
                const a = document.createElement('a');
                a.style = 'display: none';
                a.href = url;
                a.download = 'translation.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        }
    }
}
</script>


<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 50%;
    min-width: 200px;
    max-width: 500px;
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 0.25rem;
    box-shadow: 1px 1px 5px lightgray;
}

label {
    font-size: 1.2rem;
}

textarea {
    min-height: 150px;
    padding: 0.5rem;
    border: 1px solid gray;
    border-radius: 0.25rem;
    outline: none;
    margin: 0.5rem 0;
    resize: vertical;
}

button {
    align-self: flex-end;
    min-width: 25%;
    padding: 0.25rem;
}
</style>