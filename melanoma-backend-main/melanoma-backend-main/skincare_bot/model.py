class SkincareAdvisor:
    def __init__(self):
        self.advice_data = {
            "peau_sèche": [
                "Utilisez des nettoyants doux sans parfum",
                "Appliquez une crème hydratante immédiatement après le bain",
                "Préférez les crèmes aux lotions pour une meilleure hydratation",
                "Évitez les douches très chaudes",
                "Utilisez un humidificateur dans les pièces climatisées"
            ],
            "peau_grasse": [
                "Utilisez des produits non comédogènes et sans huile",
                "Lavez votre visage deux fois par jour avec un nettoyant doux",
                "Utilisez des papiers absorbants pendant la journée",
                "Choisissez des hydratants à base d'eau",
                "Évitez les gommages agressifs"
            ],
            "peau_sensible": [
                "Testez toujours les nouveaux produits sur une petite zone",
                "Utilisez des produits avec peu d'ingrédients",
                "Évitez les parfums et l'alcool",
                "Restez sur des formules douces et hypoallergéniques",
                "Protégez votre peau des conditions climatiques extrêmes"
            ],
            "protection_solaire": [
                "Utilisez un écran solaire SPF 30+ tous les jours (même en ville)",
                "Réappliquez toutes les 2 heures en extérieur",
                "Portez des vêtements protecteurs et un chapeau",
                "Cherchez l'ombre entre 10h et 16h (période de fort ensoleillement)",
                "Évitez les cabines de bronzage"
            ],
            "prévention_mélanome": [
                "Faites un auto-examen de votre peau chaque mois",
                "Consultez un dermatologue une fois par an pour un contrôle",
                "Connaissez les ABCDE du mélanome (Asymétrie, Bords, Couleur, Diamètre, Évolution)",
                "Protégez votre peau des rayons UV toute l'année",
                "Soyez particulièrement vigilant si vous avez beaucoup de grains de beauté"
            ],
            "climat_tunis": [
                "À Tunis, le soleil est fort même en hiver - utilisez une protection solaire quotidienne",
                "L'humidité élevée en été peut aggraver les peaux grasses",
                "Le climat méditerranéen nécessite une hydratation constante",
                "Protégez-vous du vent du Sahara qui peut assécher la peau",
                "Adaptez votre routine selon les saisons : plus légère en été, plus riche en hiver"
            ]
        }
    
    def get_advice(self, skin_type=None, concern=None):
        advice = []
        
        if skin_type and skin_type in self.advice_data:
            advice.extend(self.advice_data[skin_type])
        
        if concern and concern in self.advice_data:
            advice.extend(self.advice_data[concern])
        
        # If no specific type/concern, return general advice for Tunis
        if not advice:
            advice = [
                "À Tunis, protégez votre peau du soleil toute l'année",
                "Restez hydraté en buvant suffisamment d'eau",
                "Adaptez votre routine de soins selon la saison",
                "Consultez régulièrement un dermatologue pour des contrôles",
                "Utilisez des produits adaptés au climat méditerranéen"
            ]
        
        return advice
    
    def process_message(self, user_message):
        message = user_message.lower()
        response = {"advice": []}
        
        # French/Tunisian terms
        if any(word in message for word in ['sèche', 'sec', 'sèche', 'deshydrat']):
            response["advice"].extend(self.get_advice("peau_sèche"))
            response["skin_type_detected"] = "peau sèche"
        
        if any(word in message for word in ['grasse', 'gras', 'brillant', 'luisant']):
            response["advice"].extend(self.get_advice("peau_grasse"))
            response["skin_type_detected"] = "peau grasse"
        
        if any(word in message for word in ['sensible', 'rougeur', 'irrité']):
            response["advice"].extend(self.get_advice("peau_sensible"))
            response["skin_type_detected"] = "peau sensible"
        
        if any(word in message for word in ['soleil', 'uv', 'écran', 'solaire', 'protection']):
            response["advice"].extend(self.get_advice("protection_solaire"))
        
        if any(word in message for word in ['mélanome', 'cancer', 'prévention']):
            response["advice"].extend(self.get_advice("prévention_mélanome"))
        
        if any(word in message for word in ['tunis', 'climat', 'météo', 'saison']):
            response["advice"].extend(self.get_advice("climat_tunis"))
        
        # If no specific terms detected, provide general advice for Tunis
        if not response["advice"]:
            response["advice"] = self.get_advice()
            response["message"] = "Voici des conseils pour les soins de la peau à Tunis. Vous pouvez demander des conseils spécifiques pour : peau sèche, peau grasse, protection solaire, etc."
        
        return response