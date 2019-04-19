import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('rendd', () => {
    const msg = 'absolutnie zły test2'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg:msg  }
    })
    // console.log(wrapper.text())
    expect(3).to.eq(3)
    expect(wrapper.text()).to.include(msg)
  })
})
