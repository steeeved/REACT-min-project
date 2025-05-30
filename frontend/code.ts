calculatedNetTaxTotal({
    previousData,
    currentData,
    currentField,
    index
}: {
    previousData?:DetailPricingData,
    currentData:DetailPricingData,
    currentField?:string,
    index?:number
}): DetailPricingData {
    if (index === undefined) {
        throw new Error('Index must be a number when processing detail data.')
    } else {
        // TODO: This code needs to be aware of inserts and deletes in different table positions.
        let result = {
            header: HeaderPricingSchema.parse(currentData.header),
            detail: DetailPricingSchema.parse(currentData.detail)
        }
        const netSet = Decimal.isDecimal(result.detail[index].totalNet) 
        const taxSet = Decimal.isDecimal(result.detail[index].totalTax) 
        const grossSet = Decimal.isDecimal(result.detail[index].totalGross) 
        
        if (result.detail[index].discount === undefined || result.detail[index].discount === null) {
            result.detail[index].discount = DetailPricingSchema.element.shape.discount._def.defaultValue()
        }

        const quantityChanged = !Decimal(previousData?.detail?.[index]?.quantity ?? Decimal(0)).eq(Decimal(currentData.detail[index].quantity ?? Decimal(0))) 
        const unitPriceChanged = !Decimal(previousData?.detail?.[index]?.unitPrice ?? Decimal(0)).eq(Decimal(currentData.detail[index].unitPrice ?? Decimal(0))) 
        const discountChanged = !Decimal(previousData?.detail?.[index]?.discount ?? Decimal(0)).eq(Decimal(currentData.detail[index].discount ?? Decimal(0)))

        // If net, tax or gross are not set, unit price has changed, or discount has changed, recalculating net, tax and total take precedence.
        if (quantityChanged || unitPriceChanged || discountChanged || !(netSet || taxSet || grossSet)) {
            result.detail[index].totalNet = round(Decimal(result.detail[index].unitPrice).mul(result.detail[index].quantity).mul(Decimal(1).minus(Decimal(result.detail[index].discount as Decimal).dividedBy(100))), this.config.totalPriceRounding) 
            result.detail[index].totalTax = round(Decimal(result.detail[index].totalNet).mul(result.detail[index].taxRate.taxRate.dividedBy(100)), this.config.totalPriceRounding) 
            result.detail[index].totalGross = round(Decimal(result.detail[index].totalNet).plus(result.detail[index].totalTax), this.config.totalPriceRounding)
        } else {
            // Calculate missing values where possible and reset unit price based on calculations.
            if (netSet && taxSet) {
                result.detail[index].totalGross = (result.detail[index].totalNet as Decimal).plus(result.detail[index].totalTax as Decimal)
            } else if (netSet && grossSet) {
                result.detail[index].totalTax = (result.detail[index].totalGross as Decimal).minus(result.detail[index].totalNet as Decimal)
            } else if (grossSet && taxSet) {
                result.detail[index].totalNet = (result.detail[index].totalGross as Decimal).minus(result.detail[index].totalTax as Decimal)
            }
            result.detail[index].unitPrice = round((result.detail[index].totalNet as Decimal).div(Decimal(100).minus(result.detail[index].discount as Decimal)).mul(Decimal(100)).dividedBy(result.detail[index].quantity), this.config.unitPriceRounding)
        }
        result.header.totalNet = round(Decimal(result.header.totalNet ?? 0).minus(previousData?.detail?.[index]?.totalNet ?? Decimal(0)).plus(result.detail[index].totalNet as Decimal), this.config.totalPriceRounding) 
        result.header.totalTax = round(Decimal(result.header.totalTax ?? 0).minus(previousData?.detail?.[index]?.totalTax ?? Decimal(0)).plus(result.detail[index].totalTax as Decimal), this.config.totalPriceRounding) 
        result.header.totalGross = round(Decimal(result.header.totalGross ?? 0).minus(previousData?.detail?.index]?.totalGross ?? Decimal(0)).plus(result.detail[index].totalGross as Decimal), this.config.totalPriceRounding) 
        return result
    }
}