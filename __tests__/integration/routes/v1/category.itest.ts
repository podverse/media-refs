import * as chai from 'chai'
import chaiHttp = require('chai-http')
import { v1Path } from '../../utils'
const { expect: chaiExpect } = chai
chai.use(chaiHttp)

describe('_category endpoints', () => {

  describe('get by id', () => {
    test('when a valid id is provided', async (done) => {
      chai.request(global.app)
        .get(`${v1Path}/category/2ELHNnfE9Y`)
        .end((err, res) => {
          chaiExpect(res).to.have.status(200);
          chaiExpect(res.body.id).to.equal('2ELHNnfE9Y')
          chaiExpect(res.body.fullPath).to.equal('Arts>Design')
          chaiExpect(res.body.slug).to.equal('design')
          chaiExpect(res.body.title).to.equal('Design')
          chaiExpect(res.body.createdAt).to.equal('2020-04-03T06:49:43.343Z')
          chaiExpect(res.body.updatedAt).to.equal('2020-04-03T06:49:43.343Z')

          const category = res.body.category
          chaiExpect(category.id).to.equal('jeW7cF_Pv')
          chaiExpect(category.fullPath).to.equal('Arts')
          chaiExpect(category.slug).to.equal('arts')
          chaiExpect(category.title).to.equal('Arts')
          chaiExpect(category.createdAt).to.equal('2020-04-03T06:49:43.272Z')
          chaiExpect(category.updatedAt).to.equal('2020-04-03T06:49:43.272Z')
          chaiExpect(category.category).to.equal(null)

          chaiExpect(res.body.categories).to.eql([])

          //categories
          
          

          done()
        })
    })
    test('when an invalid id is provided', async (done) => {
      chai.request(global.app)
        .get(`${v1Path}/category/2ELHNasdnfE9Y`)
        .end((err, res) => {
          chaiExpect(res).to.have.status(404);
          chaiExpect(res.body.message).to.equal('Category not found')
          

          done()
        })
    })
  })

  describe('find by query', () => {
    test('top past week', async (done) => {
      chai.request(global.app)
        .get(`${v1Path}/category?page=&sort=top-past-week`)
        .end((err, res) => {
          chaiExpect(res).to.have.status(200);
          
          chaiExpect(res.body[0][0].id).to.equal('5vNa3RnSZpC')
          chaiExpect(res.body[0][0].slug).to.equal('alternativehealth')
          chaiExpect(res.body[0][0].title).to.equal('Alternative Health')

          chaiExpect(res.body[0][0].category.id).to.equal('v21EFftma5h')
          chaiExpect(res.body[0][0].category.fullPath).to.equal('Health')
          chaiExpect(res.body[0][0].category.slug).to.equal('health')
          chaiExpect(res.body[0][0].category.title).to.equal('Health')
          chaiExpect(res.body[0][0].category.createdAt).to.equal('2020-04-03T06:49:43.969Z')
          chaiExpect(res.body[0][0].category.updatedAt).to.equal('2020-04-03T06:49:43.969Z')

          chaiExpect(res.body[0][0].categories[0].id).to.equal('e0luIzX0w3B')
          chaiExpect(res.body[0][0].categories[0].fullPath).to.equal('Health>Fitness & Nutrition')
          chaiExpect(res.body[0][0].categories[0].slug).to.equal('fitnessnutrition')
          chaiExpect(res.body[0][0].categories[0].title).to.equal('Fitness & Nutrition')
          chaiExpect(res.body[0][0].categories[0].createdAt).to.equal('2020-04-03T06:49:44.020Z')
          chaiExpect(res.body[0][0].categories[0].updatedAt).to.equal('2020-04-03T06:49:44.020Z')

          chaiExpect(res.body[0][0].categories[1].id).to.equal('mDymYb4vC')
          chaiExpect(res.body[0][0].categories[1].fullPath).to.equal('Health>Sexuality')
          chaiExpect(res.body[0][0].categories[1].slug).to.equal('sexuality')
          chaiExpect(res.body[0][0].categories[1].title).to.equal('Sexuality')
          chaiExpect(res.body[0][0].categories[1].createdAt).to.equal('2020-04-03T06:49:44.089Z')
          chaiExpect(res.body[0][0].categories[1].updatedAt).to.equal('2020-04-03T06:49:44.089Z')

          chaiExpect(res.body[0][0].categories[2].id).to.equal('mRCqTE1ET-r')
          chaiExpect(res.body[0][0].categories[2].fullPath).to.equal('Health>Self-Help')
          chaiExpect(res.body[0][0].categories[2].slug).to.equal('selfhelp')
          chaiExpect(res.body[0][0].categories[2].title).to.equal('Self-Help')
          chaiExpect(res.body[0][0].categories[2].createdAt).to.equal('2020-04-03T06:49:44.066Z')
          chaiExpect(res.body[0][0].categories[2].updatedAt).to.equal('2020-04-03T06:49:44.066Z')

          chaiExpect(res.body[0][0].categories[3].id).to.equal('JXcE8Da1afa')
          chaiExpect(res.body[0][0].categories[3].fullPath).to.equal('Health>Kids & Family')
          chaiExpect(res.body[0][0].categories[3].slug).to.equal('kidsfamily')
          chaiExpect(res.body[0][0].categories[3].title).to.equal('Kids & Family')
          chaiExpect(res.body[0][0].categories[3].createdAt).to.equal('2020-04-03T06:49:44.044Z')
          chaiExpect(res.body[0][0].categories[3].updatedAt).to.equal('2020-04-03T06:49:44.044Z')


          
                
          done()
        })
    })
  })

})
