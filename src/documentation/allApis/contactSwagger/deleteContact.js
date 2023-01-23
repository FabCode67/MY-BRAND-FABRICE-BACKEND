module.exports={
    "delete": {
        "tags": ["Contact API"],
        "description": "Delete a contact by id",
        "operationId": "deleteContact",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "type": "string",
            "description": "The id of the contact to be deleted"
          }
        ],
        "responses": {
          "200": {
            "description": "Contact deleted successfully"
          },
          "404": {
            "description": "Contact not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
      
}