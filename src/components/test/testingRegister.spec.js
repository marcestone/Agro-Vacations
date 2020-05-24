//import {mount} from '@vue/test-utils'
import {shallowMount} from '@vue/test-utils'
import registro from '../../views/RegistroCliente.vue'
import VueRouter from 'vue-router'

describe("registro" , () => {
    //const wrapper = mount(registro)

    const wrapper = shallowMount(registro, {
        stubs: ['router-link'],
    })

    /*
    wrapper.setData({
        displayName: "Manuel",
        email: "manuel@gmail.com",
        })
    */

    //wrapper.findAll('input').at(1).element.value = "manuel@gmail.com" 

    it("Boton existe", () =>{
        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("Datos coincidentes", () =>{    

        //Datos de prueba

        wrapper.findAll('input').at(0).setValue("Manuel") 
        wrapper.findAll('input').at(1).setValue("manuel@gmail.com")
        wrapper.findAll('input').at(2).setValue("123456") 
        wrapper.findAll('input').at(3).setValue("123457")  


        //Actualizar variables con entradas 

        const submit = wrapper.find("button")
        submit.trigger('submit')  

        //await submit.trigger("click")


        //Llamar a la función passTwo de watch.

        wrapper.vm.$options.watch.passTwo.call(wrapper.vm)

        expect(wrapper.vm.displayName).toBe(wrapper.find('#displayName').element.value)

        expect(wrapper.vm.email).toBe(wrapper.find('#email').element.value)
    })

    it("Coincidencia de contraseñas", () => {

        wrapper.findAll('input').at(2).setValue("123456") 
        wrapper.findAll('input').at(3).setValue("123456")

        wrapper.vm.$options.watch.passTwo.call(wrapper.vm)

        expect(wrapper.vm.error).toBe(null)
    })

    it("No coincidencia de contraseñas", () => {

        wrapper.findAll('input').at(2).setValue("123456") 
        wrapper.findAll('input').at(3).setValue("123457")

        wrapper.vm.$options.watch.passTwo.call(wrapper.vm)

        expect(wrapper.vm.error).toBe("Las contraseñas deben coincidir")

        //expect(wrapper.vm.passTwo).toBe(passTwo)
    })
})