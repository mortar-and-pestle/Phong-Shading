
#version 330 core
out vec4 color;

in vec3 FragPos;  
in vec3 Normal;  
  
uniform vec3 lightPos; 
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

void main()
{
    //Setup ambient lighting using this constant

    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * lightColor;

    //Setup diffuse lighting

    vec3 normal = normalize(Normal); //Get normal vector from surface
    vec3 lightDirection = normalize(lightPos - FragPos); //Determine difference vector for light direction
    float diff = max(dot(normal, lightDirection), 0.0); //Do dot product to see how much light actually strikes surface based on the normal and lightDirection
    vec3 diffuse = diff * lightColor;

    //Setup specular lighting
    float specularStrength = 0.5;
    vec3 viewDirection = normalize(viewPos - FragPos); //Find difference vector of view Poition and Fragment Postion. Normalize
    vec3 reflectDirection = reflect(-1*lightDirection, normal); //Determine reflection angle
    float spec = pow(max(dot(viewDirection, reflectDirection), 0.0), 32); //Use dot product to find how much light iswill actually be reflected
    vec3 specular = specularStrength * spec * lightColor;

    vec3 result = (ambient + diffuse + specular) * objectColor; //Combine
    color = vec4(result, 1.0);


} 
