
//import {mount} from '@vue/test-utils'
import {shallowMount} from '@vue/test-utils'
import login from '../../views/LoginCliente.vue'
import VueRouter from 'vue-router'


describe("login" , () => {
    //const wrapper = mount(registro)

    const wrapper = shallowMount(login, {
        stubs: ["router-link","b-img","b-button","hbotton"],
    })

    it("Boton", () =>{
        expect(wrapper.find("#boxB").exists()).toBe(true)
    })

    it("Datos coincidientes", () =>{

        wrapper.findAll("input").at(0).element.value = "manuel@gmail.com";
        wrapper.findAll("input").at(1).element.value = "123456"

        //const buttonLogin = wrapper.find("b-button")
        //buttonLogin.trigger("submit")
        
        wrapper.vm.$options.methods.login.call(wrapper.vm)

        expect(wrapper.vm.email).toBe(wrapper.findAll("input").at(0).element.value)
        expect(wrapper.vm.password).toBe(wrapper.findAll("input").at(1).element.value)
    })
})

