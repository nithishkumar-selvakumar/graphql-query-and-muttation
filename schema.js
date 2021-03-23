const graphql = require('graphql');
const mongoose = require('mongoose');
const _ = require('lodash');
const{GraphQLObjectType,GraphQLList,GraphQLSchema,GraphQLInt,GraphQLString} = graphql;
const State = require('../model/state')
//const District = require('../model/district')

const state = require('../model/state');
const district = require('../model/district');
const place = require('../model/place');






const AllStateType = new GraphQLObjectType({
    name:"allstatetype",
    fields:()=>({
        statename:{type:GraphQLString},
        //sid:{type:GraphQLString},
        
    })

})

const AllDistrictType = new GraphQLObjectType({
    name:"alldistricttype",
    fields:()=>({
        statename:{type:GraphQLString},
        districtname:{type:GraphQLString}
        //did:{type:GraphQLString}

    })
})

const AllPlaceType = new GraphQLObjectType({
    name:"allplacetype",
    fields:()=>({
        districtname:{type:GraphQLString},
        placename:{type:GraphQLString},


    })
})

const Rootquery = new GraphQLObjectType({
    name:"rootquery",
    fields:{
        choosestates:{
            type:AllStateType,
            args:{statename:{type:GraphQLString}},
            resolve(parent,args)
            {
                return state.findOne({statename:args.statename})
            
            }
    
        },
        choosedistricts:{
            type:new GraphQLList( AllDistrictType),
            args:{statename:{type:GraphQLString}},
            resolve(parent,args)
            {
                return district.find({statename:args.statename})
                return district.findOne({statename:args.statename})
              
            }
        },
        allstates:{
            type:new  GraphQLList( AllStateType),
            resolve(parent,args)
            {
                return state.find({})
            }
        },
        alldistrict:{
            type:new GraphQLList(AllDistrictType),
            args:{statename:{type:GraphQLString}},
            resolve(parent,args)
            {
                return district.find({})
               
            }
        },
        allplace:{
            type: new GraphQLList(AllPlaceType),
            resolve(parent,args)
            {
                return place.find({})
            }
        },
        chooseallplace:{
            type:new GraphQLList(AllPlaceType),
            args:{districtname:{type:GraphQLString}},
            resolve(parent,args)
            {
                return place.find({districtname:args.districtname})
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addState:{
            type:AllStateType,
            args:{
                statename:{type:GraphQLString}
            },
            resolve(parent,args)
            {
                let addstate = new state({
                    statename:args.statename
                });
                return addstate.save();
            }
        },
        addDistrict:{
            type:AllDistrictType,
            args:{
                districtname:{type:GraphQLString},
                statename:{type:GraphQLString}
            },
            resolve(parent,args)
            {
                let adddistrict = new district({
                    statename:args.statename,
                    districtname:args.districtname

                });
                return adddistrict.save();
            }
        },
        addplace:{
            type:AllPlaceType,
            args:{
                districtname:{type:GraphQLString},
                placename:{type:GraphQLString}
            },
            resolve(parent,args)
            {
                let addplace = new place({
                    placename:args.placename,
                    districtname:args.districtname
                });
                return addplace.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:Rootquery,
    mutation:Mutation
})