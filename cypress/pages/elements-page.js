/// <reference types="Cypress" />
       
export class ElementsPage {

       //Login Page
        frmLogin = '.auth-box-w'

        fraLogo = '.logo-w'
        imgLogo = '.logo-w > a > img'
 
        fraLogin = '.auth-header'
        fraEmptyAlert = '#alertEmpty'  
       
        fraForm = 'form'      

        conUsername = 'form > :nth-child(1)'
        lblUsername = ':nth-child(1) > label'
        iconUsername = ':nth-child(1) > .pre-icon'
        txtUsername = '#username'

        conPassword = 'form > :nth-child(2)'
        lblPassword = 'form > :nth-child(2) > label'
        iconPassword = ':nth-child(2) > .pre-icon'
        txtPassword = '#password'

        btnLogin = '#log-in'
        lblRememberMe = '.form-check-label'
        chkRememberMe = '.form-check-input'

        conSocialMedia = '[style="text-align:center"]'
        iconTwitter = '[style="display: inline-block; margin-bottom:4px;"] > img'
        iconFacebook = ':nth-child(2) > img'
        iconLinkedIN = ':nth-child(3) > img'

       //Transaction Table Page
        topBar = '.top-bar'
        contentBox = '.content-box'
        tblRecentTransaction = '#transactionsTable'
        btnAmount = '#amount'
        tblBody = '#transactionsTable > tbody:nth-child(2)'
        btnCompareExpenses = '#showExpensesChart'

       //Chart Page
        chartContainer = '#container'
        btnShowData = '#addDataset'       
        chartCanvas = '#canvas'

        //Dynamic Page
        cyberMondayFlashSale = '#flashSale > img'
        flashSale = '#flashSale2 > img'
    
}