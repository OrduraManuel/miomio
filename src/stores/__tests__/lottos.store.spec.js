import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { inject } from 'vue'

// import { createTestingPinia } from '@pinia/testing'  
import { useLottoStore } from '@/stores'


describe('Lotto store test', () =>{
    let store = null
    beforeEach(()=>{
        setActivePinia(createPinia())
        //create an istance of the data store
        store = useLottoStore()
    })
    it('initializes with zero lottos',()=>{
        expect(store.numberOfLottos).toEqual(0)
    })
    it('test adding a new lotto', async ()=>{
        // call the addLotto action
        const lotto = {
            id: 1234567890,
            organizer: {
              id: 666,
              username: 'manivel666'
            },
            category: 'nature',
            title: 'burp',
            description: 'lottoDescription',
            location: 'lottoLocation',
            date: 'lottoDate',
            time: 'lottoTime',
            items: 'lottoItems'
          }

          async function stoca(el){
            await store.pushLotto(el)
            return expect(store.lottos[0].title).toMatch('burp')
          }
          
          await stoca(lotto)
    

        //store.createLotto(1234567890,'nature','lotto.description','lotto.location','lotto.date','lotto.time','lotto.petsAllowed','lotto.organizer')
    })
        //check that lotto was added
    it('check that lotto was added',()=>{
        console.log('sono un altro IT')
        expect(store.numberOfLottos).toEqual(1)
    })
})

