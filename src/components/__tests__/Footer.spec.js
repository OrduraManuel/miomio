import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Footer from '../Footer.vue'



describe('Footer test',()=>{
    it('render message when component is created',()=>{
        //render component
        const wrapper = shallowMount(Footer,{
            propsData: {
                title: 'Lotti'
            }
        })

        // check that the title is rendered
        expect(wrapper.text()).toMatch('Lotti')
    })
})