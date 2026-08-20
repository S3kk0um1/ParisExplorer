import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text } from "react-native";

export default function DetailsScreen(){
    const { name, rating, imageUrl }  = useLocalSearchParams();
    return(
        <>
        <Stack.Screen options={{title : name.toString()}}/>
            <ScrollView style={styles.infoContainer}>
                <Text style={styles.title}>{ name}</Text>
                <Image style={styles.image} source={{uri : imageUrl.toString()}}></Image>
                <Text>{rating} </Text>
                <Text>If you check your app now, the top navigation bar should proudly display the specific name of whichever location you tapped!

Now that our header is dynamic and the app is feeling much more like a native experience, we can tackle one of the other features we discussed earlier.To see this in action, we will also need to add some long placeholder text under the rating so the screen actually has a reason to scroll.
Oracle Java est le premier langage de programmation et la première plate-forme de développement. Il contribue à réduire les coûts, à raccourcir les délais de développement, à stimuler l'innovation et à améliorer les services d'application. Avec des millions de développeurs utilisant plus de 73 milliards de solutions JVM (Java Virtual Machine) dans le monde, Java reste la plate-forme de développement de choix pour les entreprises et les développeurs.
Java est un langage de programmation de haut niveau, orienté objet, qui met l’accent sur la simplicité, la fiabilité et la portabilité. Développé selon le principe "Écrire une fois, exécuter partout," Java permet aux développeurs d’écrire du code capable de s’exécuter sur n’importe quel appareil ou système d’exploitation doté d’une machine virtuelle Java (JVM).
Java est l’un des langages de programmation les plus populaires et les plus polyvalents. Il est connu pour son indépendance vis-à-vis de la plateforme et son large champ d’application, ce qui explique pourquoi il reste si largement utilisé dans différents secteurs.

En tant que langage à typage statique, Java contribue à réduire les erreurs en imposant une vérification stricte des types à la compilation et à l’exécution. Il intègre également une gestion automatique de la mémoire grâce au ramasse-miettes, ce qui réduit les problèmes courants liés à la mémoire. La syntaxe de Java, bien que proche de celle de C++, a été conçue pour être plus simple et plus facile à maintenir, ce qui en fait un excellent choix pour les débutants comme pour les développeurs expérimentés. Grâce à sa polyvalence et à sa capacité de mise à l’échelle, il répond à un large éventail de besoins en développement, notamment pour les applications de niveau entreprise, le développement Android et les systèmes cloud-native.
Les fonctionnalités d’observabilité intégrées devraient s’étendre pour inclure un meilleur support natif du traçage distribué, de la collecte de métriques et du débogage en production. Les fonctionnalités d’enregistreur de vol et de contrôle de mission peuvent devenir plus accessibles, ce qui facilite le diagnostic des problèmes dans des systèmes distribués complexes sans surcharge des performances.

Ces améliorations continues démontrent l’engagement de Java à rester en phase avec les tendances du secteur tout en conservant la stabilité et la fiabilité qui en ont fait un pilier du développement pour les grandes entreprises depuis des décennies.</Text>
        
        </ScrollView>
    </>
     )
        
    
};
const styles = StyleSheet.create({
    image: {
        width : '100%',
        height : 300
    },
    title: {
        fontSize :20,
        fontWeight :"bold"
    },
    infoContainer : {
        padding : 16
    }

})