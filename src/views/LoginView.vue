<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { inject } from 'vue'

import { useAuthStore } from '@/stores';

const GStore = inject('GStore')

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;

    GStore.flashMessage = 'Bentornato '+ username +'!'
    setTimeout(() =>{
            GStore.flashMessage = ''
          }, 4000)

    return authStore.login(username, password)
    .catch(error => {
        GStore.flashMessage = 'Error: '+ error +'!'
        setTimeout(() =>{
            GStore.flashMessage = ''
          }, 4000)
          throw error
          
        })
        //.catch(error => setErrors({ apiError: error }));
}
</script>

<template>
    <div>
        <div class="alert alert-info">
            Username: Admin<br />
            Password: Admin
        </div>
        <h2>Login</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="form-group">
                <label>Username</label>
                <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                <div class="invalid-feedback">{{errors.username}}</div>
            </div>            
            <div class="form-group">
                <label>Password</label>
                <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
            </div>            
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Login
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
        </Form>
    </div>
</template>