import express from 'express'
import { authMiddleware, checkRoles } from '../controllers/auth-controllers.js'
import { addGrant, getAllGrants, getGrantById, editGrant, deleteGrant } from '../controllers/grant-controllers.js'



const router = express.Router()

router.use(authMiddleware)

router.get("/", getAllGrants)


router.get("/:id", getGrantById)


router.post("/add", checkRoles("admin"), addGrant)


router.put("/edit/:id", checkRoles("admin"), editGrant)


router.delete("/delete/:id", checkRoles("admin"), deleteGrant)



export default router