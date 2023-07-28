namespace JS.AMSWeb.Utils
{
    public static class CalculationHelper
    {
        public static decimal RoundingPriceAmount(decimal amount)
        {
            return Math.Round(amount, 2);
        }

        public static decimal RoundingToken(decimal amount)
        {
            return Math.Round(amount, 0);
        }

        public static double CalculateDistance(double lat1, double lng1, double lat2, double lng2)
        {
            double rlat1 = Math.PI * lat1 / 180;
            double rlat2 = Math.PI * lat2 / 180;
            double theta = lng1 - lng2;
            double rtheta = Math.PI * theta / 180;
            double dist =
                Math.Sin(rlat1) * Math.Sin(rlat2) + Math.Cos(rlat1) *
                Math.Cos(rlat2) * Math.Cos(rtheta);
            dist = Math.Acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;

            return Math.Round(dist * 1.609344, 0);
        }
    }
}
