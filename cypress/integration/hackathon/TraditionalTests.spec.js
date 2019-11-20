/// <reference types="Cypress" />

import {ElementsPage} from '../../pages/elements-page'

const data = require('../../fixtures/data.json')
const versionOne = '/hackathon.html'
const versionTwo = '/hackathonV2.html'
const versionThree = '/hackathonApp.html?showAd=true'

describe('Functional Validation Suite using preferred traditional functional testing approach', function(){

    const webel = new ElementsPage()

    this.beforeEach('Background', ()=>{
        cy.visit(versionOne)
        cy.title().should('include', data.hackathonHomePageTitle)
    })
  
    it('Login Page UI Elements Test', ()=>{

        // Check Parent and Child Elements  
        cy.get(webel.frmLogin).should('be.visible')
            .children().should('have.length', 5)

        cy.get(webel.fraLogo).should('be.visible')
            .children().should('have.length', 1)
        cy.get(webel.imgLogo)
            .should('be.visible')

        cy.get(webel.fraLogin).should('be.visible')
            .and('not.have.descendants')
            .and('contain.text', 'Login Form')                              //bug in Version 2

        cy.get(webel.fraEmptyAlert).should('be.visible')
            .should('not.have.descendants')

        cy.get(webel.fraForm).should('be.visible')
            .children().should('have.length', 3)

        cy.get(webel.conUsername).should('be.visible')
            .children().should('have.length', 3)                            //bug in Version 2
        cy.get(webel.lblUsername).should('be.visible')
            .and('have.text', 'Username')
        cy.get(webel.iconUsername).should('be.visible')                     //bug in Version 2
        cy.get(webel.txtUsername).should('be.visible')
            .and('be.enabled')
            .and('have.class', 'form-control')
            .and('have.attr', 'placeholder', 'Enter your username')         //bug in Version 2

        cy.get(webel.conPassword).should('be.visible')
            .children().should('have.length', 3)                            //bug in Version 2
        cy.get(webel.lblPassword).should('be.visible')
            .and('contain.text', 'Password')                                //bug in Version 2
        cy.get(webel.iconPassword).should('be.visible')                     //bug in Version 2
        cy.get(webel.txtPassword).should('be.visible')
            .and('be.enabled')
            .and('have.class', 'form-control')
            .and('have.attr','placeholder','Enter your password')           //bug in Version 2

        cy.get(webel.btnLogin).should('be.visible')
            .should('be.enabled')
            .and('have.class', 'btn btn-primary')
            .and('have.text', 'Log In')
        cy.get(webel.lblRememberMe).should('be.visible')
            .should('have.text', 'Remember Me')    
        cy.get(webel.chkRememberMe).should('be.visible')
            .should('be.enabled')
            .and('have.class', 'form-check-input')

        cy.get(webel.conSocialMedia).should('be.visible')
            .children()
            .should('have.length', 3)                                       //bug in Version 2
            .and('have.attr', 'href')                                       //bug in Version 2
        cy.get(webel.iconTwitter).should('be.visible')
            .and('have.attr', 'src', 'img/social-icons/twitter.png')
        cy.get(webel.iconFacebook).should('be.visible')
            .and('have.attr', 'src', 'img/social-icons/facebook.png')
        cy.get(webel.iconLinkedIN).should('be.visible')                     //bug in Version 2
            .and('have.attr', 'src', 'img/social-icons/linkedin.png')       

    })

    it('Data-Driven Test', ()=>{
        cy.get(webel.txtUsername).clear()
        cy.get(webel.txtPassword).clear()
        cy.get(webel.btnLogin).click()
        cy.get(webel.frmLogin).invoke('attr', 'role', 'alert')                //bug in Version 2
            .should('contain.text', 'Both Username and Password must be present')
            
        cy.get(webel.txtUsername).type('Username')
        cy.get(webel.txtPassword).clear()
        cy.get(webel.btnLogin).click()
        cy.get(webel.frmLogin).invoke('attr', 'role', 'alert')
            .should('contain.text', 'Password must be present')   

        cy.get(webel.txtUsername).clear()    
        cy.get(webel.txtPassword).type('Password')
        cy.get(webel.btnLogin).click()
        cy.get(webel.frmLogin).invoke('attr', 'role', 'alert')
            .should('contain.text', 'Username must be present')
            
        cy.get(webel.txtUsername).type('Username')
        cy.get(webel.txtPassword).type('Password')
        cy.get(webel.btnLogin).click()
        cy.get(webel.frmLogin).should('not.be.visible')  
        cy.title().should('include', data.hackathonHomePageTitle)  
        cy.get(webel.topBar).should('be.visible')
        cy.get(webel.contentBox).should('be.visible')
    })

    it('Table Sort Test', ()=>{
        cy.get(webel.txtUsername).type('Username')
        cy.get(webel.txtPassword).type('Password')
        cy.get(webel.btnLogin).click()
        cy.title().should('include', data.hackathonHomePageTitle)  

        cy.get(webel.topBar).should('be.visible')
        cy.get(webel.tblRecentTransaction).should('be.visible')
        cy.get(webel.tblBody).should('be.visible')
        cy.get(webel.tblBody).find('td.text-right.bolder.nowrap')
            .should('be.visible')
            .should('have.length', 6)
        cy.get(webel.btnAmount).click() 
        
        //First attempt to verify Sort Column
        cy.get(webel.tblBody).find('td.text-right.bolder.nowrap').then($elements =>{
            var amountList = $elements.map(() => $elements.text());
            cy.wrap(amountList).should('equal', amountList.sort())
            
        })

        //Second attempt to verify Sort Column
        var listAmount =[];
            cy.get(webel.tblBody).find('td.text-right.bolder.nowrap').each(elements=>{
                elements.push(elements.text());
        });
        cy.wrap(listAmount).should('equal', listAmount.sort());    

        //Verify row
        cy.get(webel.tblBody).find('tr')
            .should('be.visible')
            .should('have.length', 6)
        
    })

    it('Canvas Chart Test', ()=>{
        cy.get(webel.txtUsername).type('Username')
        cy.get(webel.txtPassword).type('Password')
        cy.get(webel.btnLogin).click()
        cy.title().should('include', data.hackathonHomePageTitle)

        cy.get(webel.btnCompareExpenses).click()

        cy.title().should('include', data.hackathonHomePageTitle)
        cy.get(webel.topBar).should('be.visible')
        cy.get(webel.contentBox).should('be.visible')
        cy.get(webel.tblRecentTransaction).should('be.visible')         
        cy.get(webel.chartContainer).should('be.visible')
        cy.get(webel.chartCanvas).should('be.visible')
            .and('have.attr', 'class','chartjs-render-monitor')

        cy.get(webel.btnShowData).click()

        cy.get(webel.chartContainer).should('be.visible')
        cy.get(webel.chartCanvas).should('be.visible')
            .and('have.attr', 'class','chartjs-render-monitor')

        //Verify row
        cy.get(webel.tblBody).find('tr')
            .should('be.visible')
            .should('have.length', 6)

        cy.get(webel.tblRecentTransaction).should('be.visible')
        cy.get(webel.tblBody).should('be.visible')
        cy.get(webel.tblBody).find('td.text-right.bolder.nowrap')
            .should('be.visible')
            .should('have.length', 6)

    })    
})

describe('Dynamic Content Suite using preferred traditional functional testing approach', function(){

    const webel = new ElementsPage()

    this.beforeEach('Background', ()=>{
        cy.visit(versionThree)
        cy.url().should('include', 'showAd=true')
        cy.title().should('include', data.hackathonHomePageTitle)

    })

    it('Dynamic Content Test', ()=>{        
        cy.get(webel.cyberMondayFlashSale).should('be.visible')
        cy.get(webel.flashSale).should('be.visible')

    })
})