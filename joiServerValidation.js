const Joi=require("joi");

const listingSchemaJoi=Joi.object({
    listing:Joi.object({ //put constraints listing should be object and be required
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        image:Joi.string().allow("",null),
        price:Joi.number().required().min(0),
    }).required()
});

const reviewSchemaJoi=Joi.object({
    review:Joi.object({
        name:Joi.string().allow("",null),
        review:Joi.string().required(),
        rating:Joi.number().required().min(1).max(5),
        image:Joi.string().allow("",null)
    }).required()
})

module.exports={listingSchemaJoi,reviewSchemaJoi};