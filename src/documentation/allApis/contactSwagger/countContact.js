module.exports={
    "get": {
        "summary": "Count the number of contacts",
        "tags": ["Contact API"],
        "responses": {
            "200": {
                "description": "OK",
                "schema": {
                    "type": "object",
                    "example": {
                        "message": "There are 10 contacts in the collection."
                    }
                }
            },
            "500": {
                "description": "Error counting contacts"
            }
        }
    }
}
