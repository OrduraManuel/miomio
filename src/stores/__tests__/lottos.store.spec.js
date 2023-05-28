import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLottoStore } from '../lottos.store'
import LottoService from '../../services/LottoService';

describe('Lotto store test', () => {
  let store;
  beforeEach(async () => {
    //create an istance of the data store
    setActivePinia(createPinia());

    //! puoi inizializzare lo store globale qui ma devi avere le azioni che non dipendono l'una con l'altra
    // store = useLottoStore();
  })


  //! non ha senso di esistere questo test
  // it('initializes with zero lottos', () => {
  //   store = useLottoStore();
  //   expect(store.numberOfLottos).toEqual(0)
  // })

  it('test adding a new lotto --> static', () => {
    store = useLottoStore();

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

    store.lottos.push(lotto)

    expect(store.numberOfLottos).toBeGreaterThan(0);
    expect(store.lottos[0]).toHaveProperty('title', 'burp');
    expect(Object.keys(store.lottos[0])).toEqual(Object.keys(lotto));
  })

  it('test adding a new lotto --> spyOn http', async () => {
    store = useLottoStore();

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

    const mockResponse = { data: lotto }
    vi.spyOn(LottoService, 'postLotto').mockResolvedValue(mockResponse);

    await store.pushLotto(lotto)

    expect(store.numberOfLottos).toBeGreaterThan(0);
    expect(store.lottos[0]).toHaveProperty('title', 'burp');
    expect(Object.keys(store.lottos[0])).toEqual(Object.keys(lotto));
  })

  //! non ha senso di esistere questo test
  // it('check that lotto was added', () => {
  //   store = useLottoStore();
  //   console.log('sono un altro IT')
  //   expect(store.numberOfLottos).toEqual(1)
  // })
})
