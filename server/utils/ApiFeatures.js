class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword 
            ?
                {
                    name: {
                        $regex   : this.queryStr.keyword,
                        $options : "i"
                    }
                }
            : {};

        this.query = this.query.find({...keyword}); // don't use reference of keyword directly;
        return this;
    }

    filter() {
        let copyOfQuery = { ...this.queryStr };
        const otherFields = ["keyword", "page", "limit"];

        otherFields.forEach(field => delete copyOfQuery[field]);

        // filter by price
        let queryString = JSON.stringify(copyOfQuery);
        queryString = queryString.replace(/\b(gt|lt|gte|lte)\b/g, operator => `$${operator}`);

        copyOfQuery = JSON.parse(queryString);
        this.query = this.query.find(copyOfQuery);

        return this;
    }

    pagination(itemsPerPage) {
        const currentPage = this.queryStr.page;
        const toSkip      = (currentPage - 1) * itemsPerPage;
        
        this.query = this.query.limit(itemsPerPage).skip(toSkip);
        return this;
    }
}

module.exports = ApiFeatures;