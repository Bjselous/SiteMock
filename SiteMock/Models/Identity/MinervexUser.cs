using System;

namespace SiteMock.Models.Identity
{
    /// <summary>
    /// The interface that can be user for all IMinervexUser
    /// </summary>
    /// <seealso cref="IMinervexUser" />
    public class MinervexUser
    {
        public string[] UserRoles { get; set; }
    }
}
