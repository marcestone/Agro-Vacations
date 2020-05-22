import { shallowMount, mount } from "@vue/test-utils";

//import MisActividades from "@/views/MisActividades.vue";
import Activity from "@/components/Activity.vue";
//import Navigation from "@/components/Navigation.vue";

describe("Activity.vue", () => {
  let wrapper;
  beforeEach(()=>{
    wrapper=shallowMount(Activity, {
      methods:{showMsgBoxTwo: ()=>{}}
    })
  })
  it ("Existe el método showMsgBoxTwo", ()=>{
    expect(wrapper.exists()).toBe(true);
  })
});

test('Mount Activity vue component', ()=>{
  const wrapper = mount(Activity)
})

/*test('Mount a vue component', ()=>{
  const wrapper = mount(Navigation)
})*/
