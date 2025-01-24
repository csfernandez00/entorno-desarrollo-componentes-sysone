import axiosInstance from "../axiosInstance";

const get_insurable_types = async () => {
	const response = await axiosInstance.get(
		`policy-life/v1/insurable-types`,
		{}
	);
	return response.data;
};

const get_coverage_types = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/subsections/${code}/coverages`,
		{}
	);
	return response.data;
};

const get_calculator_types = async () => {
	const response = await axiosInstance.get(
		`product/v1/expense-calculator-types`,
		{}
	);
	return response.data;
};

const get_coverage_calculator_types = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/subsections/${code}/coverage-calculator-types`,
		{}
	);
	return response.data;
};

const get_tax_groups = async () => {
	const response = await axiosInstance.get(`tax/v1/tax-groups`, {});
	return response.data;
};

const get_wordings_by_subsection = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/subsections/${code}/wordings`,
		{}
	);
	return response.data;
};

const get_bills_types = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/subsections/${code}/expenses`,
		{}
	);
	return response.data;
};

const create_new_coverage_type = async (code, data) => {
	const response = await axiosInstance.put(
		`product/v1/subsections/${code}/coverages`,
		data
	);
	return response.data;
};

const create_product = async (postData) => {
	const response = await axiosInstance.post(
		`policy-life/v1/products`,
		postData
	);
	return response.data;
};

const get_products = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/subsections/${code}/products`,
		{
			headers: {
				url_code: "subsections/products",
			},
		}
	);
	return response.data;
};

const get_product_coverages = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/products/${code}/coverages`,
		{}
	);
	return response.data;
};

const get_product_segments = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/products/${code}/segments`,
		{}
	);
	return response.data;
};

const get_product_expenses = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/products/${code}/expenses`,
		{}
	);
	return response.data;
};

const get_product_wordings = async (code) => {
	const response = await axiosInstance.get(
		`product/v1/products/${code}/wordings`,
		{}
	);
	return response.data;
};

const get_intermediary_structures = async (code) => {
	const response = await axiosInstance.get(
		`intermediary/v1/intermediary/${code}/commercial-structures`,
		{}
	);
	return response.data;
};

const calculate_quotation = async (postData, isLifeProduct) => {
	const response = await axiosInstance.post(
		`policy-${isLifeProduct ? "life" : "home"}/v1/quotations/calculate`,
		postData
	);
	return response.data;
};

const create_quotation = async (postData, isLifeProduct) => {
	const response = await axiosInstance.post(
		`policy-${isLifeProduct ? "life" : "home"}/v1/quotations`,
		postData
	);
	return response.data;
};

const create_request = async (code) => {
	const response = await axiosInstance.post(
		`request/v1/quotations/${code}/requests`,
		{}
	);
	return response.data;
};

const search_quotations = async (params) => {
	const response = await axiosInstance.get(`quotation/v1/quotations`, {
		params: params,
	});
	return response.data;
};

const update_request_holder = async (reqCode, postData) => {
	const response = await axiosInstance.put(
		`request/v1/requests/${reqCode}/holder`,
		postData
	);
	return response.data;
};

const update_request_paymentMethods = async (reqCode, postData) => {
	const response = await axiosInstance.put(
		`request/v1/requests/${reqCode}/payment-methods`,
		postData
	);
	return response.data;
};

const get_quotation_validities = async () => {
	const response = await axiosInstance.get(
		`quotation/v1/quotation-validities`,
		{}
	);
	return response.data;
};

const get_payment_frequencies = async () => {
	const response = await axiosInstance.get(
		`quotation/v1/payment-frequencies`,
		{}
	);
	return response.data;
};

const get_file_types = async () => {
	const response = await axiosInstance.get(`request/v1/file-types`, {});
	return response.data;
};

const update_request_files = async (code, postData) => {
	const response = await axiosInstance.put(
		`request/v1/requests/${code}/files`,
		postData
	);
	return response.data;
};

const get_quotation_details = async (code, isLifeProduct) => {
	const response = await axiosInstance.get(
		`policy-${isLifeProduct ? "life" : "home"}/v1/quotations/${code}`,
		{}
	);
	return response.data;
};

const get_request_details = async (code, isLifeProduct) => {
	const response = await axiosInstance.get(
		`policy-${isLifeProduct ? "life" : "home"}/v1/requests/${code}`,
		{}
	);
	return response.data;
};

const get_card_providers = async () => {
	const response = await axiosInstance.get(`finance/v1/card-providers`);
	return response.data;
};

const update_request_risks = async (code, postData) => {
	const response = await axiosInstance.put(
		`policy-home/v1/requests/${code}/values`,
		postData
	);
	return response.data;
};

const send_request = async (code) => {
	const response = await axiosInstance.post(
		`policy-home/v1/requests/${code}/policy`,
		{}
	);
	return response.data;
};

const get_quotation_report = async (code, isLifeProduct) => {
	const response = await axiosInstance.get(
		`policy-${isLifeProduct ? "life" : "home"}/v1/quotations/${code}/report`,
		{
			headers: {
				"Content-Type": "application/pdf",
			},
			responseType: "arraybuffer",
		}
	);
	return response.data;
};

const search_requests = async (params) => {
	const response = await axiosInstance.get(`request/v1/requests`, {
		params: params,
	});
	return response.data;
};

export {
	get_insurable_types,
	get_coverage_types,
	get_calculator_types,
	get_coverage_calculator_types,
	get_tax_groups,
	get_wordings_by_subsection,
	get_bills_types,
	create_new_coverage_type,
	create_product,
	get_products,
	get_product_coverages,
	get_product_segments,
	get_product_expenses,
	get_product_wordings,
	get_intermediary_structures,
	calculate_quotation,
	create_quotation,
	create_request,
	search_quotations,
	update_request_holder,
	update_request_paymentMethods,
	get_quotation_validities,
	get_payment_frequencies,
	get_file_types,
	update_request_files,
	get_quotation_details,
	get_request_details,
	update_request_risks,
	send_request,
	get_quotation_report,
	search_requests,
	get_card_providers,
};
