import * as chai from 'chai'
import chaiHttp = require('chai-http')
import { testUsers, v1Path } from '../../utils'
const { expect: chaiExpect } = chai
chai.use(chaiHttp)

describe('playlist endpoints', () => {

  describe('get by id', () => {
    test('when a valid id is provided', async (done) => {
      chai.request(global.app)
        .get(`${v1Path}/playlist/CH_2-LlM`)
        .end((err, res) => {
          chaiExpect(res).to.have.status(200);
          chaiExpect(res.body.id).to.equal('CH_2-LlM')
          chaiExpect(res.body).to.have.property('description')
          chaiExpect(res.body.isPublic).to.equal(false)
          chaiExpect(res.body.itemCount).to.equal(2)
          chaiExpect(res.body.itemsOrder).to.eql([])
          chaiExpect(res.body.title).to.equal('Premium - Test Playlist 2')
          chaiExpect(res.body.createdAt).to.equal('2020-03-02T22:38:21.768Z')
          chaiExpect(res.body.updatedAt).to.equal('2020-05-26T01:22:00.712Z')
          chaiExpect(res.body.episodes).to.eql([])

          const mediaRef = res.body.mediaRefs[0]
          const episode = res.body.mediaRefs[0].episode
          chaiExpect(mediaRef.id).to.equal('6UFQc7Lq')
          chaiExpect(mediaRef.endTime).to.equal(1496)
          chaiExpect(mediaRef.isPublic).to.equal(true)
          chaiExpect(mediaRef.pastHourTotalUniquePageviews).to.equal(2)
          chaiExpect(mediaRef.pastDayTotalUniquePageviews).to.equal(3)
          chaiExpect(mediaRef.pastWeekTotalUniquePageviews).to.equal(4)
          chaiExpect(mediaRef.pastMonthTotalUniquePageviews).to.equal(5)
          chaiExpect(mediaRef.pastYearTotalUniquePageviews).to.equal(6)
          chaiExpect(mediaRef.pastAllTimeTotalUniquePageviews).to.equal(7)
          chaiExpect(mediaRef.startTime).to.equal(1366)
          chaiExpect(mediaRef.title).to.equal('Viverra orci sagittis eu volutpat odio facilisis mauris sit.')
          chaiExpect(mediaRef.createdAt).to.equal('2020-03-02T22:27:41.585Z')
          chaiExpect(mediaRef.updatedAt).to.equal('2020-03-02T23:00:42.173Z')

          chaiExpect(episode.id).to.equal('4uE26PEF_y')
          chaiExpect(episode).to.have.property('description')
          chaiExpect(episode.duration).to.equal(0)
          chaiExpect(episode.episodeType).to.equal('full')
          
          

          done()
        })
    })

    test('when an invalid id is provided', async (done) => {
      chai.request(global.app)
        .get(`${v1Path}/playlist/CH_2-LasdflM`)
        .end((err, res) => {
          chaiExpect(res).to.have.status(404);
          chaiExpect(res.body.message).to.equal('Playlist not found')

          done()
        })
    })
  })

  describe('playlist create', () => {
    const sendBody = {
      "description": "Test description",
      "isPublic": true,
      "itemsOrder": [],
      "mediaRefs": [],
      "title": "Test title"
    }

    test('when the user is not logged in', async (done) => {
      chai.request(global.app)
        .post(`${v1Path}/playlist`)
        .send(sendBody)
        .end((err, res) => {
          chaiExpect(res).to.have.status(401)

          done()
        })
    })

    test('when the user is logged in', async (done) => {
      chai.request(global.app)
        .post(`${v1Path}/playlist`)
        .set('Cookie', testUsers.premium.authCookie)
        .send(sendBody)
        .end((err, res) => {
          chaiExpect(res).to.have.status(200)

          chaiExpect(res.body.description).to.equal('Test description')
          chaiExpect(res.body.isPublic).to.equal(true)
          chaiExpect(res.body.itemsOrder).to.eql([])
          chaiExpect(res.body.mediaRefs).to.eql([])
          chaiExpect(res.body.title).to.equal('Test title')
          chaiExpect(res.body.owner).to.equal('QMReJmbE')
          chaiExpect(res.body).to.have.property('id')
          chaiExpect(res.body.itemCount).to.equal(0)
          chaiExpect(res.body).to.have.property('createdAt')
          chaiExpect(res.body).to.have.property('updatedAt')

          done()
        })
    })
  })

  describe('playlist update', () => {
    const sendBody = {
      "id": "CH_2-LlM",
      "description": "New test description",
      "isPublic": true,
      "itemsOrder": [],
      "mediaRefs": [],
      "title": "New test title"
    }

    test('when the user is not logged in', async (done) => {
      chai.request(global.app)
        .patch(`${v1Path}/playlist`)
        .send(sendBody)
        .end((err, res) => {
          chaiExpect(res).to.have.status(401)

          done()
        })
    })

    test('when the user is logged in', async (done) => {
      chai.request(global.app)
        .patch(`${v1Path}/playlist`)
        .set('Cookie', testUsers.premium.authCookie)
        .send(sendBody)
        .end((err, res) => {
          chaiExpect(res).to.have.status(200)

          chaiExpect(res.body.id).to.equal('CH_2-LlM')
          chaiExpect(res.body.description).to.equal('New test description')
          chaiExpect(res.body.isPublic).to.equal(true)
          chaiExpect(res.body.itemCount).to.equal(0)
          chaiExpect(res.body.itemsOrder).to.eql([])
          chaiExpect(res.body.title).to.equal('New test title')          
          chaiExpect(res.body).to.have.property('createdAt')
          chaiExpect(res.body).to.have.property('updatedAt')
          chaiExpect(res.body.episodes).to.eql([])
          chaiExpect(res.body.mediaRefs).to.eql([])

          chaiExpect(res.body.owner.id).to.equal('QMReJmbE')
          chaiExpect(res.body.owner.isPublic).to.equal(true) 
          chaiExpect(res.body.owner.name).to.equal('Premium Valid - Test User') 

          done()
        })
    })
  })

})