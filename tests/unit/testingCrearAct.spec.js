import {shallowMount} from '@vue/test-utils'
import publicar from '@/views/CrearActividad.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue';

describe("registro" , () => {
    //const wrapper = mount(registro)

    const wrapper = shallowMount(publicar, {
        stubs: ['router-link','b-carousel-slide','b-row'],
        components: { 'b-input': publicar, 'b-form-datepicker': publicar, 'b-carousel': publicar,
                      'b-form-file': publicar, 'b-button': publicar,
                    }
    })

    it("Boton existe", () =>{
        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("Datos coincidentes", () =>{    

        //Datos de prueba

        wrapper.find("b-input").at(0).setValue("Manuel");  

        //Actualizar variables con entradas 

        const submit = wrapper.find("button")
        submit.trigger('click')  

        //await submit.trigger("click")


        //Llamar a la función passTwo de watch.

        expect(wrapper.vm.$data).toBe(wrapper.findAll('input').at(0).element.value)

    })
})