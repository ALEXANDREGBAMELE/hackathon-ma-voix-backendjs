const createPost = async(req, res) => {
    try {
        const { titre, description, image } = req.body
        if (!titre || !description) {
            return res.status(400).json({ messageDerreur: "veuillez rempli les champs correctement" })
        }
        const newPost = new Post(req.body)

        await newPost.save()
        return res.status(200).json({
            success: true,
            status: 200,
            message: "post crée avec succes",
            data: newPost
        })
    } catch (error) {
        console.log("erreur lors de la creation du post", error.message);

        res.status(500).json({ message: error.message })
    }

}