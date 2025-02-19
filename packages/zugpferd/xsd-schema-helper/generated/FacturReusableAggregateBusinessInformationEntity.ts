export class FacturReusableAggregateBusinessInformationEntity {
	public constructor(props?: FacturReusableAggregateBusinessInformationEntity) {
		this['@class'] = '.FacturReusableAggregateBusinessInformationEntity'
	}
}

export class CreditorFinancialAccountType {
	public IBANID?: IDType
	public ProprietaryID?: IDType

	public constructor(props?: CreditorFinancialAccountType) {
		this['@class'] = '.CreditorFinancialAccountType'

		if (props) {
			this.IBANID = props.IBANID
			this.ProprietaryID = props.ProprietaryID
		}
	}
}

export class DebtorFinancialAccountType {
	public IBANID: IDType

	public constructor(props?: DebtorFinancialAccountType) {
		this['@class'] = '.DebtorFinancialAccountType'

		if (props) {
			this.IBANID = props.IBANID
		}
	}
}

export class DocumentContextParameterType {
	public ID: IDType

	public constructor(props?: DocumentContextParameterType) {
		this['@class'] = '.DocumentContextParameterType'

		if (props) {
			this.ID = props.ID
		}
	}
}

export class DocumentLineDocumentType {
	public LineID: IDType
	public IncludedNote?: NoteType

	public constructor(props?: DocumentLineDocumentType) {
		this['@class'] = '.DocumentLineDocumentType'

		if (props) {
			this.LineID = props.LineID
			this.IncludedNote = (props.IncludedNote) ? new NoteType(props.IncludedNote) : undefined
		}
	}
}

export class ExchangedDocumentContextType {
	public BusinessProcessSpecifiedDocumentContextParameter?: DocumentContextParameterType
	public GuidelineSpecifiedDocumentContextParameter: DocumentContextParameterType

	public constructor(props?: ExchangedDocumentContextType) {
		this['@class'] = '.ExchangedDocumentContextType'

		if (props) {
			this.BusinessProcessSpecifiedDocumentContextParameter = (props.BusinessProcessSpecifiedDocumentContextParameter)
				? new DocumentContextParameterType(props.BusinessProcessSpecifiedDocumentContextParameter)
				: undefined
			this.GuidelineSpecifiedDocumentContextParameter = (props.GuidelineSpecifiedDocumentContextParameter)
				? new DocumentContextParameterType(props.GuidelineSpecifiedDocumentContextParameter)
				: undefined
		}
	}
}

export class ExchangedDocumentType {
	public ID: IDType
	public TypeCode: DocumentCodeType
	public IssueDateTime: DateTimeType
	public IncludedNote?: NoteType[]

	public constructor(props?: ExchangedDocumentType) {
		this['@class'] = '.ExchangedDocumentType'

		if (props) {
			this.ID = props.ID
			this.TypeCode = props.TypeCode
			this.IssueDateTime = props.IssueDateTime
			this.IncludedNote = props.IncludedNote?.map((o) => new NoteType(o))
		}
	}
}

export class HeaderTradeAgreementType {
	public BuyerReference?: TextType
	public SellerTradeParty: TradePartyType
	public BuyerTradeParty: TradePartyType
	public SellerTaxRepresentativeTradeParty?: TradePartyType
	public BuyerOrderReferencedDocument?: ReferencedDocumentType
	public ContractReferencedDocument?: ReferencedDocumentType

	public constructor(props?: HeaderTradeAgreementType) {
		this['@class'] = '.HeaderTradeAgreementType'

		if (props) {
			this.BuyerReference = props.BuyerReference
			this.SellerTradeParty = (props.SellerTradeParty) ? new TradePartyType(props.SellerTradeParty) : undefined
			this.BuyerTradeParty = (props.BuyerTradeParty) ? new TradePartyType(props.BuyerTradeParty) : undefined
			this.SellerTaxRepresentativeTradeParty = (props.SellerTaxRepresentativeTradeParty)
				? new TradePartyType(props.SellerTaxRepresentativeTradeParty)
				: undefined
			this.BuyerOrderReferencedDocument = (props.BuyerOrderReferencedDocument)
				? new ReferencedDocumentType(props.BuyerOrderReferencedDocument)
				: undefined
			this.ContractReferencedDocument = (props.ContractReferencedDocument)
				? new ReferencedDocumentType(props.ContractReferencedDocument)
				: undefined
		}
	}
}

export class HeaderTradeDeliveryType {
	public ShipToTradeParty?: TradePartyType
	public ActualDeliverySupplyChainEvent?: SupplyChainEventType
	public DespatchAdviceReferencedDocument?: ReferencedDocumentType

	public constructor(props?: HeaderTradeDeliveryType) {
		this['@class'] = '.HeaderTradeDeliveryType'

		if (props) {
			this.ShipToTradeParty = (props.ShipToTradeParty) ? new TradePartyType(props.ShipToTradeParty) : undefined
			this.ActualDeliverySupplyChainEvent = (props.ActualDeliverySupplyChainEvent)
				? new SupplyChainEventType(props.ActualDeliverySupplyChainEvent)
				: undefined
			this.DespatchAdviceReferencedDocument = (props.DespatchAdviceReferencedDocument)
				? new ReferencedDocumentType(props.DespatchAdviceReferencedDocument)
				: undefined
		}
	}
}

export class HeaderTradeSettlementType {
	public CreditorReferenceID?: IDType
	public PaymentReference?: TextType
	public TaxCurrencyCode?: CurrencyCodeType
	public InvoiceCurrencyCode: CurrencyCodeType
	public PayeeTradeParty?: TradePartyType
	public SpecifiedTradeSettlementPaymentMeans?: TradeSettlementPaymentMeansType[]
	public ApplicableTradeTax: TradeTaxType[]
	public BillingSpecifiedPeriod?: SpecifiedPeriodType
	public SpecifiedTradeAllowanceCharge?: TradeAllowanceChargeType[]
	public SpecifiedTradePaymentTerms?: TradePaymentTermsType
	public SpecifiedTradeSettlementHeaderMonetarySummation: TradeSettlementHeaderMonetarySummationType
	public InvoiceReferencedDocument?: ReferencedDocumentType[]
	public ReceivableSpecifiedTradeAccountingAccount?: TradeAccountingAccountType

	public constructor(props?: HeaderTradeSettlementType) {
		this['@class'] = '.HeaderTradeSettlementType'

		if (props) {
			this.CreditorReferenceID = props.CreditorReferenceID
			this.PaymentReference = props.PaymentReference
			this.TaxCurrencyCode = props.TaxCurrencyCode
			this.InvoiceCurrencyCode = props.InvoiceCurrencyCode
			this.PayeeTradeParty = (props.PayeeTradeParty) ? new TradePartyType(props.PayeeTradeParty) : undefined
			this.SpecifiedTradeSettlementPaymentMeans = props.SpecifiedTradeSettlementPaymentMeans?.map((o) =>
				new TradeSettlementPaymentMeansType(o)
			)
			this.ApplicableTradeTax = props.ApplicableTradeTax?.map((o) => new TradeTaxType(o))
			this.BillingSpecifiedPeriod = (props.BillingSpecifiedPeriod)
				? new SpecifiedPeriodType(props.BillingSpecifiedPeriod)
				: undefined
			this.SpecifiedTradeAllowanceCharge = props.SpecifiedTradeAllowanceCharge?.map((o) =>
				new TradeAllowanceChargeType(o)
			)
			this.SpecifiedTradePaymentTerms = (props.SpecifiedTradePaymentTerms)
				? new TradePaymentTermsType(props.SpecifiedTradePaymentTerms)
				: undefined
			this.SpecifiedTradeSettlementHeaderMonetarySummation = (props.SpecifiedTradeSettlementHeaderMonetarySummation)
				? new TradeSettlementHeaderMonetarySummationType(props.SpecifiedTradeSettlementHeaderMonetarySummation)
				: undefined
			this.InvoiceReferencedDocument = props.InvoiceReferencedDocument?.map((o) => new ReferencedDocumentType(o))
			this.ReceivableSpecifiedTradeAccountingAccount = (props.ReceivableSpecifiedTradeAccountingAccount)
				? new TradeAccountingAccountType(props.ReceivableSpecifiedTradeAccountingAccount)
				: undefined
		}
	}
}

export class LegalOrganizationType {
	public ID?: IDType
	public TradingBusinessName?: TextType

	public constructor(props?: LegalOrganizationType) {
		this['@class'] = '.LegalOrganizationType'

		if (props) {
			this.ID = props.ID
			this.TradingBusinessName = props.TradingBusinessName
		}
	}
}

export class LineTradeAgreementType {
	public GrossPriceProductTradePrice?: TradePriceType
	public NetPriceProductTradePrice: TradePriceType

	public constructor(props?: LineTradeAgreementType) {
		this['@class'] = '.LineTradeAgreementType'

		if (props) {
			this.GrossPriceProductTradePrice = (props.GrossPriceProductTradePrice)
				? new TradePriceType(props.GrossPriceProductTradePrice)
				: undefined
			this.NetPriceProductTradePrice = (props.NetPriceProductTradePrice)
				? new TradePriceType(props.NetPriceProductTradePrice)
				: undefined
		}
	}
}

export class LineTradeDeliveryType {
	public BilledQuantity: QuantityType

	public constructor(props?: LineTradeDeliveryType) {
		this['@class'] = '.LineTradeDeliveryType'

		if (props) {
			this.BilledQuantity = props.BilledQuantity
		}
	}
}

export class LineTradeSettlementType {
	public ApplicableTradeTax: TradeTaxType
	public BillingSpecifiedPeriod?: SpecifiedPeriodType
	public SpecifiedTradeAllowanceCharge?: TradeAllowanceChargeType[]
	public SpecifiedTradeSettlementLineMonetarySummation: TradeSettlementLineMonetarySummationType

	public constructor(props?: LineTradeSettlementType) {
		this['@class'] = '.LineTradeSettlementType'

		if (props) {
			this.ApplicableTradeTax = (props.ApplicableTradeTax) ? new TradeTaxType(props.ApplicableTradeTax) : undefined
			this.BillingSpecifiedPeriod = (props.BillingSpecifiedPeriod)
				? new SpecifiedPeriodType(props.BillingSpecifiedPeriod)
				: undefined
			this.SpecifiedTradeAllowanceCharge = props.SpecifiedTradeAllowanceCharge?.map((o) =>
				new TradeAllowanceChargeType(o)
			)
			this.SpecifiedTradeSettlementLineMonetarySummation = (props.SpecifiedTradeSettlementLineMonetarySummation)
				? new TradeSettlementLineMonetarySummationType(props.SpecifiedTradeSettlementLineMonetarySummation)
				: undefined
		}
	}
}

export class NoteType {
	public Content: TextType
	public SubjectCode?: CodeType

	public constructor(props?: NoteType) {
		this['@class'] = '.NoteType'

		if (props) {
			this.Content = props.Content
			this.SubjectCode = props.SubjectCode
		}
	}
}

export class ReferencedDocumentType {
	public IssuerAssignedID: IDType
	public FormattedIssueDateTime?: FormattedDateTimeType

	public constructor(props?: ReferencedDocumentType) {
		this['@class'] = '.ReferencedDocumentType'

		if (props) {
			this.IssuerAssignedID = props.IssuerAssignedID
			this.FormattedIssueDateTime = props.FormattedIssueDateTime
		}
	}
}

export class SpecifiedPeriodType {
	public StartDateTime?: DateTimeType
	public EndDateTime?: DateTimeType

	public constructor(props?: SpecifiedPeriodType) {
		this['@class'] = '.SpecifiedPeriodType'

		if (props) {
			this.StartDateTime = props.StartDateTime
			this.EndDateTime = props.EndDateTime
		}
	}
}

export class SupplyChainEventType {
	public OccurrenceDateTime: DateTimeType

	public constructor(props?: SupplyChainEventType) {
		this['@class'] = '.SupplyChainEventType'

		if (props) {
			this.OccurrenceDateTime = props.OccurrenceDateTime
		}
	}
}

export class SupplyChainTradeLineItemType {
	public AssociatedDocumentLineDocument: DocumentLineDocumentType
	public SpecifiedTradeProduct: TradeProductType
	public SpecifiedLineTradeAgreement: LineTradeAgreementType
	public SpecifiedLineTradeDelivery: LineTradeDeliveryType
	public SpecifiedLineTradeSettlement: LineTradeSettlementType

	public constructor(props?: SupplyChainTradeLineItemType) {
		this['@class'] = '.SupplyChainTradeLineItemType'

		if (props) {
			this.AssociatedDocumentLineDocument = (props.AssociatedDocumentLineDocument)
				? new DocumentLineDocumentType(props.AssociatedDocumentLineDocument)
				: undefined
			this.SpecifiedTradeProduct = (props.SpecifiedTradeProduct)
				? new TradeProductType(props.SpecifiedTradeProduct)
				: undefined
			this.SpecifiedLineTradeAgreement = (props.SpecifiedLineTradeAgreement)
				? new LineTradeAgreementType(props.SpecifiedLineTradeAgreement)
				: undefined
			this.SpecifiedLineTradeDelivery = (props.SpecifiedLineTradeDelivery)
				? new LineTradeDeliveryType(props.SpecifiedLineTradeDelivery)
				: undefined
			this.SpecifiedLineTradeSettlement = (props.SpecifiedLineTradeSettlement)
				? new LineTradeSettlementType(props.SpecifiedLineTradeSettlement)
				: undefined
		}
	}
}

export class SupplyChainTradeTransactionType {
	public IncludedSupplyChainTradeLineItem: SupplyChainTradeLineItemType[]
	public ApplicableHeaderTradeAgreement: HeaderTradeAgreementType
	public ApplicableHeaderTradeDelivery: HeaderTradeDeliveryType
	public ApplicableHeaderTradeSettlement: HeaderTradeSettlementType

	public constructor(props?: SupplyChainTradeTransactionType) {
		this['@class'] = '.SupplyChainTradeTransactionType'

		if (props) {
			this.IncludedSupplyChainTradeLineItem = props.IncludedSupplyChainTradeLineItem?.map((o) =>
				new SupplyChainTradeLineItemType(o)
			)
			this.ApplicableHeaderTradeAgreement = (props.ApplicableHeaderTradeAgreement)
				? new HeaderTradeAgreementType(props.ApplicableHeaderTradeAgreement)
				: undefined
			this.ApplicableHeaderTradeDelivery = (props.ApplicableHeaderTradeDelivery)
				? new HeaderTradeDeliveryType(props.ApplicableHeaderTradeDelivery)
				: undefined
			this.ApplicableHeaderTradeSettlement = (props.ApplicableHeaderTradeSettlement)
				? new HeaderTradeSettlementType(props.ApplicableHeaderTradeSettlement)
				: undefined
		}
	}
}

export class TaxRegistrationType {
	public ID: IDType

	public constructor(props?: TaxRegistrationType) {
		this['@class'] = '.TaxRegistrationType'

		if (props) {
			this.ID = props.ID
		}
	}
}

export class TradeAccountingAccountType {
	public ID: IDType

	public constructor(props?: TradeAccountingAccountType) {
		this['@class'] = '.TradeAccountingAccountType'

		if (props) {
			this.ID = props.ID
		}
	}
}

export class TradeAddressType {
	public PostcodeCode?: CodeType
	public LineOne?: TextType
	public LineTwo?: TextType
	public LineThree?: TextType
	public CityName?: TextType
	public CountryID: CountryIDType
	public CountrySubDivisionName?: TextType

	public constructor(props?: TradeAddressType) {
		this['@class'] = '.TradeAddressType'

		if (props) {
			this.PostcodeCode = props.PostcodeCode
			this.LineOne = props.LineOne
			this.LineTwo = props.LineTwo
			this.LineThree = props.LineThree
			this.CityName = props.CityName
			this.CountryID = props.CountryID
			this.CountrySubDivisionName = props.CountrySubDivisionName
		}
	}
}

export class TradeAllowanceChargeType {
	public ChargeIndicator: IndicatorType
	public CalculationPercent?: PercentType
	public BasisAmount?: AmountType
	public ActualAmount: AmountType
	public ReasonCode?: AllowanceChargeReasonCodeType
	public Reason?: TextType
	public CategoryTradeTax?: TradeTaxType

	public constructor(props?: TradeAllowanceChargeType) {
		this['@class'] = '.TradeAllowanceChargeType'

		if (props) {
			this.ChargeIndicator = props.ChargeIndicator
			this.CalculationPercent = props.CalculationPercent
			this.BasisAmount = props.BasisAmount
			this.ActualAmount = props.ActualAmount
			this.ReasonCode = props.ReasonCode
			this.Reason = props.Reason
			this.CategoryTradeTax = (props.CategoryTradeTax) ? new TradeTaxType(props.CategoryTradeTax) : undefined
		}
	}
}

export class TradePartyType {
	public ID?: IDType[]
	public GlobalID?: IDType[]
	public Name?: TextType
	public SpecifiedLegalOrganization?: LegalOrganizationType
	public PostalTradeAddress?: TradeAddressType
	public URIUniversalCommunication?: UniversalCommunicationType
	public SpecifiedTaxRegistration?: TaxRegistrationType

	public constructor(props?: TradePartyType) {
		this['@class'] = '.TradePartyType'

		if (props) {
			this.ID = props.ID?.map((o) => o)
			this.GlobalID = props.GlobalID?.map((o) => o)
			this.Name = props.Name
			this.SpecifiedLegalOrganization = (props.SpecifiedLegalOrganization)
				? new LegalOrganizationType(props.SpecifiedLegalOrganization)
				: undefined
			this.PostalTradeAddress = (props.PostalTradeAddress) ? new TradeAddressType(props.PostalTradeAddress) : undefined
			this.URIUniversalCommunication = (props.URIUniversalCommunication)
				? new UniversalCommunicationType(props.URIUniversalCommunication)
				: undefined
			this.SpecifiedTaxRegistration = (props.SpecifiedTaxRegistration)
				? new TaxRegistrationType(props.SpecifiedTaxRegistration)
				: undefined
		}
	}
}

export class TradePaymentTermsType {
	public Description?: TextType
	public DueDateDateTime?: DateTimeType
	public DirectDebitMandateID?: IDType

	public constructor(props?: TradePaymentTermsType) {
		this['@class'] = '.TradePaymentTermsType'

		if (props) {
			this.Description = props.Description
			this.DueDateDateTime = props.DueDateDateTime
			this.DirectDebitMandateID = props.DirectDebitMandateID
		}
	}
}

export class TradePriceType {
	public ChargeAmount: AmountType
	public BasisQuantity?: QuantityType
	public AppliedTradeAllowanceCharge?: TradeAllowanceChargeType

	public constructor(props?: TradePriceType) {
		this['@class'] = '.TradePriceType'

		if (props) {
			this.ChargeAmount = props.ChargeAmount
			this.BasisQuantity = props.BasisQuantity
			this.AppliedTradeAllowanceCharge = (props.AppliedTradeAllowanceCharge)
				? new TradeAllowanceChargeType(props.AppliedTradeAllowanceCharge)
				: undefined
		}
	}
}

export class TradeProductType {
	public GlobalID?: IDType
	public Name: TextType

	public constructor(props?: TradeProductType) {
		this['@class'] = '.TradeProductType'

		if (props) {
			this.GlobalID = props.GlobalID
			this.Name = props.Name
		}
	}
}

export class TradeSettlementHeaderMonetarySummationType {
	public LineTotalAmount: AmountType
	public ChargeTotalAmount?: AmountType
	public AllowanceTotalAmount?: AmountType
	public TaxBasisTotalAmount: AmountType
	public TaxTotalAmount?: AmountType
	public GrandTotalAmount: AmountType
	public TotalPrepaidAmount?: AmountType
	public DuePayableAmount: AmountType

	public constructor(props?: TradeSettlementHeaderMonetarySummationType) {
		this['@class'] = '.TradeSettlementHeaderMonetarySummationType'

		if (props) {
			this.LineTotalAmount = props.LineTotalAmount
			this.ChargeTotalAmount = props.ChargeTotalAmount
			this.AllowanceTotalAmount = props.AllowanceTotalAmount
			this.TaxBasisTotalAmount = props.TaxBasisTotalAmount
			this.TaxTotalAmount = props.TaxTotalAmount
			this.GrandTotalAmount = props.GrandTotalAmount
			this.TotalPrepaidAmount = props.TotalPrepaidAmount
			this.DuePayableAmount = props.DuePayableAmount
		}
	}
}

export class TradeSettlementLineMonetarySummationType {
	public LineTotalAmount: AmountType

	public constructor(props?: TradeSettlementLineMonetarySummationType) {
		this['@class'] = '.TradeSettlementLineMonetarySummationType'

		if (props) {
			this.LineTotalAmount = props.LineTotalAmount
		}
	}
}

export class TradeSettlementPaymentMeansType {
	public TypeCode: PaymentMeansCodeType
	public PayerPartyDebtorFinancialAccount?: DebtorFinancialAccountType
	public PayeePartyCreditorFinancialAccount?: CreditorFinancialAccountType

	public constructor(props?: TradeSettlementPaymentMeansType) {
		this['@class'] = '.TradeSettlementPaymentMeansType'

		if (props) {
			this.TypeCode = props.TypeCode
			this.PayerPartyDebtorFinancialAccount = (props.PayerPartyDebtorFinancialAccount)
				? new DebtorFinancialAccountType(props.PayerPartyDebtorFinancialAccount)
				: undefined
			this.PayeePartyCreditorFinancialAccount = (props.PayeePartyCreditorFinancialAccount)
				? new CreditorFinancialAccountType(props.PayeePartyCreditorFinancialAccount)
				: undefined
		}
	}
}

export class TradeTaxType {
	public CalculatedAmount?: AmountType
	public TypeCode: TaxTypeCodeType
	public ExemptionReason?: TextType
	public BasisAmount?: AmountType
	public CategoryCode: TaxCategoryCodeType
	public ExemptionReasonCode?: CodeType
	public DueDateTypeCode?: TimeReferenceCodeType
	public RateApplicablePercent?: PercentType

	public constructor(props?: TradeTaxType) {
		this['@class'] = '.TradeTaxType'

		if (props) {
			this.CalculatedAmount = props.CalculatedAmount
			this.TypeCode = props.TypeCode
			this.ExemptionReason = props.ExemptionReason
			this.BasisAmount = props.BasisAmount
			this.CategoryCode = props.CategoryCode
			this.ExemptionReasonCode = props.ExemptionReasonCode
			this.DueDateTypeCode = props.DueDateTypeCode
			this.RateApplicablePercent = props.RateApplicablePercent
		}
	}
}

export class UniversalCommunicationType {
	public URIID: IDType

	public constructor(props?: UniversalCommunicationType) {
		this['@class'] = '.UniversalCommunicationType'

		if (props) {
			this.URIID = props.URIID
		}
	}
}
