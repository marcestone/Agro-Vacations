//import {mount} from '@vue/test-utils'
import {shallowMount} from '@vue/test-utils'
import loginV from '@/views/LoginCliente.vue'
import VueRouter from 'vue-router'
import flushPromises from "flush-promises";

// eslint-disable-next-line
import db from "@/db.js";


jest.mock("firebase/app",() =>({
    auth(){
        return{
            signInWithEmailAndPassword(){
                return Promise.resolve();
            }
        }
    }
}))


describe("login" , () => {

    const wrapper = shallowMount(loginV, {
        stubs: ["router-link","b-img","b-button","hbotton"],
    })

    it("Boton", () =>{
        expect(wrapper.find("#boxB").exists()).toBe(true)
    })

    it("Datos coincidientes", async () =>{


        wrapper.findAll("input").at(0).setValue("manuel@gmail.com");
        wrapper.findAll("input").at(1).setValue("123456");

        /*
        wrapper.setData({
            email: "manuel@gmail.com",
            password: "123456",
            error: ""
        });
        */

        //const buttonLogin = wrapper.find("button")
        //buttonLogin.trigger("submit")

        wrapper.vm.$options.methods.login.call(wrapper.vm);

        await flushPromises();

        expect(wrapper.vm.$data.email).toBe("manuel@gmail.com");
        expect(wrapper.vm.$data.error).toBe("");
    })

    it("Prueba de error email",async () => {

        wrapper.findAll("input").at(0).setValue("");
        wrapper.findAll("input").at(1).setValue("123456");

        wrapper.setData({
            error: ""
        });

        wrapper.vm.$options.methods.login.call(wrapper.vm);

        await flushPromises();

        expect(wrapper.vm.$data.error).toBe("The email address is badly formatted.");
        expect(wrapper.vm.$data.error).not.toBe("");
    })

    it("Prueba de error contraseña" , async() => {

        wrapper.findAll("input").at(0).setValue("manuel@gmail.com");
        wrapper.findAll("input").at(1).setValue("");

        wrapper.setData({
            error: ""
        });

        wrapper.vm.$options.methods.login.call(wrapper.vm);

        await flushPromises();

        expect(wrapper.vm.$data.error).toBe("The password is invalid or the user does not have a password.");
        expect(wrapper.vm.$data.error).not.toBe("");
    })
})

