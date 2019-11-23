using Newtonsoft.Json;
using System.Collections.Generic;

namespace SiteMock.Models.Admin
{
    public class SpaBusinessRules 
    {
        public SpaBusinessRules()
        {

        }

        public SpaBusinessRules(string centerId)
        {
            CenterId = centerId;
        }

        //Operating Hours
        public string CenterId { get; set; }
        public int OpenTime { get; set; }
        public int CloseTime { get; set; }
        public int EarlySessionOpenTime { get; set; }
        public int LateSessionCloseTime { get; set; }
        public int LateSessionBookingCutOffTime { get; set; }
        public int EarlySessionBookingCutOffTime { get; set; }

        public string serialisedGapsBetweenBookings { get; set; }
        public string serialisedPricesForServices { get; set; }

        /// <summary>
        /// A dictionary of operational gaps between bookings. Index for operational gaps is Service ID. 
        /// </summary>
        public Dictionary<string, int> GapsBetweenBookings
        {
            get
            {
                if (serialisedGapsBetweenBookings == null)
                {
                    return new Dictionary<string, int>();
                }
                else
                {
                    return JsonConvert.DeserializeObject<Dictionary<string, int>>(serialisedGapsBetweenBookings);
                }
            }
            set
            {
                this.serialisedGapsBetweenBookings = JsonConvert.SerializeObject(value);
            }
        }

        /// <summary>
        /// A dictionary of prices. Index for prices is Service ID followed by session length. 
        /// </summary>
        public Dictionary<string, Dictionary<int, int>> PricesForServices
        {
            get
            {
                if (serialisedPricesForServices == null)
                {
                    return new Dictionary<string, Dictionary<int, int>>();
                }
                else
                {
                    return JsonConvert.DeserializeObject<Dictionary<string, Dictionary<int, int>>>(serialisedPricesForServices);
                }
            }
            set
            {
                this.serialisedPricesForServices = JsonConvert.SerializeObject(value);
            }
        }


        /// <summary>
        /// Adds a session to this services session list. Will handle serialization
        /// </summary>
        /// <param name="sessionLength">Length of the session.</param>
        public void AddOrUpdateGapBetweenAppointment(string serviceID, int gapLength)
        {
            var temp = GapsBetweenBookings;
            temp[serviceID] = gapLength;
            serialisedGapsBetweenBookings = JsonConvert.SerializeObject(temp);
        }

        /// <summary>
        /// Adds a session to this services session list. Will handle serialization
        /// </summary>
        /// <param name="sessionLength">Length of the session.</param>
        public void AddOrUpdatePrice(string serviceID, int session, int price)
        {
            var temp = PricesForServices;

            if (!temp.ContainsKey(serviceID))
            {
                temp[serviceID] = new Dictionary<int, int>();
            }

            temp[serviceID][session] = price;
            serialisedPricesForServices = JsonConvert.SerializeObject(temp);
        }

        /// <summary>
        /// Removes a session from this services session list. Will handle serialization
        /// </summary>
        /// <param name="sessionLength">Length of the session.</param>
        public void RemoveServiceFromGapDictionary(string serviceID)
        {
            if (GapsBetweenBookings.ContainsKey(serviceID))
            {
                var temp = GapsBetweenBookings;
                temp.Remove(serviceID);
                serialisedGapsBetweenBookings = JsonConvert.SerializeObject(temp);
            }
        }

    }
}
