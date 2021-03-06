import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/hello-world.vue';

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg },
        });
        const test = wrapper.text();
        expect(test).toMatch(msg);
    });
});
