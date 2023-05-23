import app from './app'
import env from './config/env.config'

app.listen(env.PORT, async () => {
	try {
		/*
    This is where you can run any initialization logic needed for your Express app.
    */
		console.log(`Ready on http://localhost:${env.PORT}`)
	} catch (error: any) {
		console.log('ERROR:', error)
	}
})

/*
resources
- https://josipmisko.com/posts/rest-api-best-practices
- https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design
*/
