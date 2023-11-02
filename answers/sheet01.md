# Sheet 01

## Exercise 1

Data mining is not just hype; it's a key tool for making sense of large datasets. It pulls from databases, statistics, machine learning, and pattern recognition to find useful patterns. It's not just an extension of database tech; machine learning and stats have played a big role in its development too. In practice, you start with cleaning your data. Then you apply algorithms to find patterns. After that, you check to make sure those patterns are actually meaningful. Finally, you use these insights in real-world applications. It's a powerful field with growing importance in today's data-heavy world, especially considering current AI advancements.

## Exercise 2

Characterization: This is about summarizing data attributes and creating a profile for a group of data. For example, if you have a database of customer purchases, characterization could tell you the average age and spending habits of a "typical" customer.

Discrimination: This contrasts two or more classes. In a healthcare database, you might use discrimination to find differences between patients who respond well to a treatment and those who don't.

Association and Correlation Analysis: Here you find rules that highlight relationships between seemingly independent data. Like, people who buy diapers often also buy baby food. This is common in retail databases for making recommendations.

Classification: You sort data into predefined classes. In a university database, you might classify students based on their risk of dropping out.

Regression: This predicts numerical outcomes. In stock market databases, regression could predict the future price of a stock based on historical data.

Clustering: Groups similar data points together but without predefined classes. In a music streaming service database, clustering could group songs that are similar in tempo, genre, etc.

Outlier Analysis: Identifies abnormal data points. In a database tracking factory equipment, outlier analysis could flag a machine that's operating at unusually high temperatures.

## Exercise 3

Data mining is critical for e-commerce businesses like Amazon. To stay ahead, Amazon needs functionalities like association and correlation analysis, classification, and clustering.

Association and correlation help in making accurate product recommendations. When you buy a laptop, the system might also suggest a laptop bag or mouse, increasing sales through bundling.

Classification is used for customer segmentation. Knowing who is likely to be a repeat customer or who is at risk of churning allows for targeted marketing, which can be more cost-effective.

Clustering helps in inventory management. By grouping similar items together, Amazon can optimize its warehouse operations, reducing costs and increasing efficiency.

Simple queries can tell you what happened but not why, or what's likely to happen next. Basic statistical analysis may give you some insights but won't capture complex relationships between multiple variables. Data mining techniques are essential for digging deeper and making predictive models that drive smarter business decisions.

## Exercise 4

1. Individual Customer Model: This method focuses on the spending habits of each customer. If a transaction deviates significantly from a customer's usual behavior, it's flagged as an outlier. For example, if someone who usually shops locally starts making large purchases overseas, that's a red flag.

2. General Customer Behavior Model: This one compares individual transactions to the overall spending behavior of all customers. If a transaction is an outlier compared to general spending habits, it's flagged. Like if there's a sudden large transaction at 3 a.m., which is uncommon in the customer base, it may be flagged.

The individual model is generally more accurate for flagging transactions that are unusual for a specific customer, but it might miss types of fraud that are rare for that individual but common in broader fraudulent schemes. The general model might catch those but could flag normal transactions as outliers if they're not typical for the larger population.

## Exercise 5

Computational Time: Algorithms that work well on small data may take too long on a large scale. Speed is crucial in many applications like real-time fraud detection.

Memory: Large datasets may not fit into the main memory, requiring disk-based or distributed computing solutions.

Quality: More data doesn't always mean better results. Noise and outliers can distort findings, and it's harder to sift through them in larger datasets.

Infrastructure: Big data often needs a more robust computing infrastructure, including data storage and processing capabilities, which can be expensive.
