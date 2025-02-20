/***********
generated template classes for C:/Users/henningue/Documents/Privat/ecoincome/einvoice/ecoincome-js-e-invoice-handler/packages/zugpferd/_resources/Factur-X_1.07.2_BASIC.xsd 17.2.2025, 21:40:57
***********/





export class Factur_X_1_07_2_BASIC {
    public crossIndustryInvoice: CrossIndustryInvoice;

    public constructor(props?: Factur_X_1_07_2_BASIC) {
        this["@class"] = ".Factur_X_1_07_2_BASIC";


        if (props) {

        	this.crossIndustryInvoice = props.crossIndustryInvoice;
        }
    }
}

export class CrossIndustryInvoiceType {
    public ExchangedDocumentContext: ExchangedDocumentContextType;
    public ExchangedDocument: ExchangedDocumentType;
    public SupplyChainTradeTransaction: SupplyChainTradeTransactionType;

    public constructor(props?: CrossIndustryInvoiceType) {
        this["@class"] = ".CrossIndustryInvoiceType";


        if (props) {

        	this.ExchangedDocumentContext = props.ExchangedDocumentContext;
        	this.ExchangedDocument = props.ExchangedDocument;
        	this.SupplyChainTradeTransaction = props.SupplyChainTradeTransaction;
        }
    }
}

export type CrossIndustryInvoice = CrossIndustryInvoiceType;
