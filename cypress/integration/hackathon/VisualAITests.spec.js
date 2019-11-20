/// <reference types="Cypress" />

import {ElementsPage} from '../../pages/elements-page'

const data = require('../../fixtures/data.json')
const versionOne = '/hackathon.html'
const versionTwo = '/hackathonV2.html'
const versionThree = '/hackathonApp.html?showAd=true'

describe('Functional Validation Suite using visual AI testing with Applitools', function(){

    const webel = new ElementsPage()

    this.beforeEach('Background', ()=>{
        cy.visit(versionTwo)
        cy.title().should('include', data.hackathonHomePageTitle)
        cy.eyesOpen({appName: 'Visual AI Rockstar Hackathon', batchName: 'VisualAITests'})
    })

    this.afterEach('Tear Down', ()=>{      
        cy.eyesClose()
    })    
    
    it('Login Page UI Elements Test',()=>{
        cy.eyesCheckWindow('ACME Demo App - Home Page')

    })

    it('Data-Driven Test', ()=>{
        cy.get(webel.txtUsername).clear()
        cy.get(webel.txtPassword).clear()
        cy.get(webel.btnLogin).click()
        cy.eyesCheckWindow('Both Username and Password must be present')
      
        cy.get(webel.txtUsername).type('Username')
        cy.get(webel.txtPassword).clear()
        cy.get(webel.btnLogin).click()
        cy.eyesCheckWindow('Password must be present')

        cy.get(webel.txtUsername).clear()    
        cy.get(webel.txtPassword).type('Password')
        cy.get(webel.btnLogin).click()
        cy.eyesCheckWindow('Username must be present')
        
        cy.get(webel.txtUsername).type('Username')
        cy.get(webel.txtPassword).type('Password')
        cy.get(webel.btnLogin).click()
        cy.eyesCheckWindow('Compare Expenses Page ')

    })

    it('Table Sort Test', ()=>{
        cy.get(webel.txtUsername).type('Username')
        cy.get(webel.txtPassword).type('Password')
        
        cy.get(webel.btnLogin).click()
        cy.eyesCheckWindow('Compare Expenses Page')
        
        cy.get(webel.btnAmount).click()    
        cy.eyesCheckWindow('Sort Amount')
         
    })

    it('Canvas Chart Test', ()=>{
        cy.get(webel.txtUsername).type('Username')
        cy.get(webel.txtPassword).type('Password')

        cy.get(webel.btnLogin).click()
        cy.eyesCheckWindow('Compare Expenses Page')

        cy.get(webel.btnCompareExpenses).click()
        cy.eyesCheckWindow('Expenses and Forecast Comparison')

        cy.get(webel.btnShowData).click()
        cy.eyesCheckWindow('Show Data for Next Year')

    })
})

describe('Dynamic Content Suite using visual AI testing with Applitools', function(){

    const webel = new ElementsPage()

    this.beforeEach('Background', ()=>{
        cy.visit(versionThree)
        cy.url().should('include', 'showAd=true')
        cy.title().should('include', data.hackathonHomePageTitle)
        cy.eyesOpen({appName: 'Visual AI Rockstar Hackathon', batchName: 'VisualAITests'})
    })

    this.afterEach('Tear Down', ()=>{      
        cy.eyesClose()
    })

    it('Dynamic Content Test', ()=>{        
        cy.get(webel.cyberMondayFlashSale).should('be.visible')
        cy.get(webel.flashSale).should('be.visible')
        cy.eyesCheckWindow('Show Flashsale Ad')

    })
})