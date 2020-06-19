//import {mount} from '@vue/test-utils'
import {shallowMount} from '@vue/test-utils'
import home from '@/views/Home.vue'
import VueRouter from 'vue-router'

describe("Home" , () => {

    const wrapper = shallowMount(home, {
        stubs: ['router-link', 'b-icon'],
    })


    it("KeyWordFilter", () =>{    

        wrapper.findAll('input').at(0).setValue("Paracaidismo") 
        const submit = wrapper.find("button")
        submit.trigger('click')  
        wrapper.vm.$options.methods.search.call(wrapper.vm)
        expect(wrapper.vm.keyWordFilter).toBe("Paracaidismo")
      
    })

    it("locationFilterTest", () =>{    

        wrapper.findAll('input').at(1).setValue("Suesca")
        const submit = wrapper.find("button")
        submit.trigger('click')  
        wrapper.vm.$options.methods.search.call(wrapper.vm)
        expect(wrapper.vm.locationFilter).toBe("Suesca")
      
    })

    it("SelectPriceTest", () =>{    

        wrapper.findAll('select').at(0).setValue("100000") 
        const submit = wrapper.find("button")
        submit.trigger('click')  
        wrapper.vm.$options.methods.search.call(wrapper.vm)
        expect(wrapper.vm.priceFilter).toBe("100000")
      
    })
})