<script>
    let altText = 'No image selected';

    async function getAltText() {
        let image = document.getElementById('imageInput').files[0];

        let fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = async () => {
            let imageElement = document.getElementById('image');
            imageElement.src = fileReader.result;

            let response = await fetch('/alttext', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: imageElement.src
                })
            });

            let responseBody = await response.json();

            altText = responseBody.altText;
        }
    }
</script>

<h1>MSFT Reactor Azure OpenAI Vision Demo</h1>

<h2>Input Image</h2>
<input type="file" id="imageInput" accept="image/*" on:input={getAltText}>
<img id="image" width="400" src="" alt="">

<h2>Alt Text</h2>
<p>{altText}</p>