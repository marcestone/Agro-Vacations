import {shallowMount} from '@vue/test-utils'
import publicar from '@/views/CrearActividad.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue';

describe("registro" , () => {
    //const wrapper = mount(registro)

    const wrapper = shallowMount(publicar, {
        stubs: ['router-link','b-carousel-slide','b-row'],
        components: { 'b-input': publicar, 'b-form-datepicker': publicar, 'b-carousel': publicar,
                      'b-form-file': publicar, 'b-button': publicar, 'b-icon': publicar
                    }
    })

    it("Boton existe", () =>{
        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("Nombre actividad" ,() => {
        wrapper.find("#inputName").setValue("Paseo"); 
        const submit = wrapper.find("button");
        submit.trigger('click');
        expect(wrapper.vm.$data.activityName).toBe("Paseo");
    }) 

    it("Precio actividad" ,() => {
        wrapper.find("#inputName").setValue("Paseo"); 
        const submit = wrapper.find("button");
        submit.trigger('click');
        wrapper.find("#inputPrice").setValue("100000"); 
    })  

    it("Nombre actividad" ,() => {
        wrapper.find("#inputType").findAll("option").at(0).setSelected();  
        const submit = wrapper.find("button");
        submit.trigger('click');
        expect(wrapper.vm.$data.activityType).toBe("Extreme");
    })  

    it("Nombre actividad" ,() => {
        wrapper.find("#inputLocation").setValue("Bogota");
        const submit = wrapper.find("button");
        submit.trigger('click');
        expect(wrapper.vm.$data.activityLocation).toBe("Bogota");
    })  

    it("Nombre actividad" ,() => {
        wrapper.find("#inputTransport").findAll("option").at(0).setSelected(); 
        const submit = wrapper.find("button");
        submit.trigger('click');
        expect(wrapper.vm.$data.activityTransport).toBe("Yes");
    })  
    it("Nombre actividad" ,() => {
        wrapper.find("#description").setValue("Descripción de prueba");
        const submit = wrapper.find("button");
        submit.trigger('click');
        expect(wrapper.vm.$data.description).toBe("Descripción de prueba");
    })  

    it("Datos coincidentes", () =>{    

        //Datos de prueba

        wrapper.find("#inputName").setValue("Paseo");  
        wrapper.find("#inputPrice").setValue("100000");  
        wrapper.find("#inputType").findAll("option").at(0).setSelected();  
        wrapper.find("#inputLocation").setValue("Bogota");  
        wrapper.find("#inputTransport").findAll("option").at(0).setSelected();
        wrapper.find("#description").setValue("Descripción de prueba");
        //Actualizar variables con entradas 

        const submit = wrapper.find("button");
        submit.trigger('click'); 

        //await submit.trigger("click")


        //Llamar a la función passTwo de watch.

        expect(wrapper.vm.$data.activityName).toBe("Paseo");
        expect(wrapper.vm.$data.activityPrice).toBe("100000");
        expect(wrapper.vm.$data.activityType).toBe("Extreme");
        expect(wrapper.vm.$data.activityLocation).toBe("Bogota");
        expect(wrapper.vm.$data.activityTransport).toBe("Yes");
        expect(wrapper.vm.$data.description).toBe("Descripción de prueba");

    })
})