class Service {
    async makeRequest(url){
        const response = await fetch(url)
        return response.json()
    }

    async getPlanets(url){
        const data = await this.makeRequest(url)

        return {
            name: data.name,
            surfaceWater: data.surface_water,
            appearIn: data.films.length
        }
    }
}

module.exports = Service